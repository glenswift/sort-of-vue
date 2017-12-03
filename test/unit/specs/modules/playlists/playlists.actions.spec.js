import { expect } from 'chai'

const actionsInjector = require('inject-loader!../../../../../src/store/modules/playlists/playlists.actions')

const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]
    try {
      expect(mutation.type).to.equal(type)
      if (payload) {
        expect(mutation.payload).to.deep.equal(payload)
      }
    } catch (error) {
      done(error)
    }
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }
  action({ commit, state }, payload)
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('playlists.actions', () => {
  describe('fetchPlaylistById', () => {
    it('should call success mutation in case of success spotify response', done => {
      const actions = actionsInjector({
        '../../../services/SpotifyService': {
          fetchPlaylistById() {
            return Promise.resolve({ id: '422', uri: 'spotify:something' })
          },
        },
      })
      testAction(actions.fetchPlaylistById, { user: 42, id: 422 }, {}, [
        { type: 'FETCH_PLAYLIST_BY_ID', payload: { user: 42, id: 422 }},
        { type: 'FETCH_PLAYLIST_BY_ID_SUCCESS', payload: { user: 42, id: 422, playlist: { id: '422', uri: 'spotify:something' }}},
      ], done)
    })

    it('should call error mutation in case of error spotify response', done => {
      const actions = actionsInjector({
        '../../../services/SpotifyService': {
          fetchPlaylistById() {
            return Promise.reject()
          },
        },
      })
      testAction(actions.fetchPlaylistById, { user: 42, id: 422 }, {}, [
        { type: 'FETCH_PLAYLIST_BY_ID', payload: { user: 42, id: 422 }},
        { type: 'FETCH_PLAYLIST_BY_ID_FAILED', payload: { user: 42, id: 422 }},
      ], done)
    })
  })

  describe('fetchPlaylistByUser', () => {
    it('should call success mutation in case of success spotify response', done => {
      const actions = actionsInjector({
        '../../../services/SpotifyService': {
          fetchPlaylistsByUser() {
            return Promise.resolve([{ id: '422', items: [] }])
          },
        },
      })
      testAction(actions.fetchPlaylistsByUser, 42, {}, [
        { type: 'FETCH_PLAYLISTS_BY_USER', payload: { user: 42 }},
        { type: 'FETCH_PLAYLISTS_BY_USER_SUCCESS', payload: { user: 42, playlists: [{ id: '422', items: [] }] }},
      ], done)
    })

    it('should call error mutation in case of error spotify response', done => {
      const actions = actionsInjector({
        '../../../services/SpotifyService': {
          fetchPlaylistsByUser() {
            return Promise.reject()
          },
        },
      })
      testAction(actions.fetchPlaylistsByUser, 42, {}, [
        { type: 'FETCH_PLAYLISTS_BY_USER', payload: { user: 42 }},
        { type: 'FETCH_PLAYLISTS_BY_USER_FAILED', payload: { user: 42 }},
      ], done)
    })
  })
})
