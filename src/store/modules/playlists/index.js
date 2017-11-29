import * as getters from './playlists.getters'
import * as actions from './playlists.actions'
import { mutations } from './playlists.mutations'

const state = {
  fetching: {
    playlistsByUser: {},
    playlistsById: {},
  },
  fetched: {
    playlistsByUser: {},
    playlistsById: {},
  },
  playlistsByUser: {

  },
  playlistsById: {

  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
