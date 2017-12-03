import { expect } from 'chai'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { shallow } from 'vue-test-utils'
import playlists from '../../../../src/store/modules/playlists'
import tracks from '../../../../src/store/modules/tracks'

import Playlist from '../../../../src/components/playlists/Playlist.vue'

describe('Playlist.vue', () => {
  playlists.actions = (require('inject-loader!../../../../src/store/modules/playlists/playlists.actions'))({
    '../../../services/SpotifyService': {
      fetchPlaylistById() {
        return Promise.resolve({
          id: 422,
          uri: 'spotify:something',
          name: 'Something',
        })
      },
    },
  })

  tracks.actions = (require('inject-loader!../../../../src/store/modules/tracks/tracks.actions'))({
    '../../../services/SpotifyService': {
      fetchTracksByPlaylist() {
        return Promise.resolve({
          items: [
            {
              track: {
                id: 4222,
                name: 'wow',
                artists: [{ name: 'doge' }],
                album: { images: [{ url: null }] },
              },
              uri: 'track:4222',
            },
            {
              track: {
                id: 4223,
                name: 'track',
                artists: [{ name: 'doge' }],
                album: { images: [{ url: null }] },
              },
              uri: 'track:4223',
            },
          ],
        })
      },
    },
  })

  Vue.use(Vuex)
  const store = new Vuex.Store({
    modules: {
      playlists,
      tracks,
    },
  })

  it('should contain playlist name', done => {
    const wrapper = shallow(Playlist, {
      propsData: {
        user: 42,
        id: 422,
      },
      store,
    })
    // vuex docs recommends using vuex.nextTick() for such cases.
    // but I don't really understand how it supposes to help in case we have inconsistent state setting order
    // with multiple ticks. So, I just paste setTimeout for now.
    setTimeout(() => {
      expect(wrapper.html()).to.contain('Something')
      done()
    }, 1000)
  })

  it('should contain tracks', done => {
    const wrapper = shallow(Playlist, {
      propsData: {
        user: 42,
        id: 422,
      },
      store,
    })
    setTimeout(() => {
      expect(wrapper.findAll('.tracks > div').length).equal(2)
      expect(wrapper.findAll('.tracks > div').at(0).html()).to.contain('wow')
      expect(wrapper.findAll('.tracks > div').at(1).html()).to.contain('track')
      done()
    }, 1000)
  })
})
