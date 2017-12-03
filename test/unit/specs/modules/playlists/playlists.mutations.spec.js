import { expect } from 'chai'
import _ from 'lodash'
import module from '../../../../../src/store/modules/playlists'

const { state: initialState, mutations } = module

describe('playlist.mutations', () => {
  const playlistSample = { uri: 'spotify:something' }
  const playlistsSample = { items: [{ id: 422, uri: 'spotify:something' }, { id: 423, uri: 'spotify:something-else' }] }
  let state

  beforeEach(() => {
    state = Object.assign({}, initialState)
  })

  it('FETCH_PLAYLIST_BY_ID', () => {
    mutations.FETCH_PLAYLIST_BY_ID(state, { user: 42, id: 422 })
    expect(state.fetching.playlistsById[422]).to.be.true
    expect(state.fetched.playlistsById[422]).to.be.false
  })

  it('FETCH_PLAYLIST_BY_ID_SUCCESS', () => {
    mutations.FETCH_PLAYLIST_BY_ID_SUCCESS(state, { user: 42, id: 422, playlist: playlistSample })
    expect(state.fetching.playlistsById[422]).to.be.false
    expect(state.fetched.playlistsById[422]).to.be.true
    expect(state.playlistsById[422]).to.equal(playlistSample)
  })

  it('FETCH_PLAYLISTS_BY_USER', () => {
    mutations.FETCH_PLAYLISTS_BY_USER(state, { user: 42 })
    expect(state.fetching.playlistsByUser[42]).to.be.true
    expect(state.fetched.playlistsByUser[42]).to.be.false
  })

  it('FETCH_PLAYLISTS_BY_USER_SUCCESS', () => {
    mutations.FETCH_PLAYLISTS_BY_USER_SUCCESS(state, { user: 42, playlists: playlistsSample })
    expect(state.fetching.playlistsByUser[42]).to.be.false
    expect(state.fetched.playlistsByUser[42]).to.be.true
    _.each(playlistsSample.items, (item, i) => {
      expect(state.playlistsByUser[42].items[i]).to.equal(playlistsSample.items[i].id)
    })
    _.each(playlistsSample.items, item => {
      expect(state.playlistsById[item.id]).to.equal(item)
    })
  })
})
