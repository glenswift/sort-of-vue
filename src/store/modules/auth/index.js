import * as getters from './auth.getters'
import * as actions from './auth.actions'
import { mutations } from './auth.mutations'

const state = {
  token: localStorage.getItem('sortofvue::spotify::token') || null,
  profile: null,
  fetching: {
    profile: false,
  },
  fetched: {
    profile: false,
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
