import * as getters from './tracks.getters'
import * as actions from './tracks.actions'
import { mutations } from './tracks.mutations'

const state = {
  fetching: {
    tracksByPlaylist: {},
    tracksById: {},
  },
  fetched: {
    tracksByPlaylist: {},
    tracksById: {},
  },
  tracksByPlaylist: {

  },
  tracksById: {

  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
