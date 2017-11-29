import * as types from '../../mutation-types'

export const mutations = {

  [types.FINISH_SIGN_IN] (state, { token }) {
    state.token = token
  },

  [types.FETCH_PROFILE] (state) {
    state.fetching.profile = true
    state.fetched.profile = false
  },

  [types.FETCH_PROFILE_SUCCESS] (state, { profile }) {
    state.profile = profile
    state.fetching.profile = false
    state.fetched.profile = true
  },

}
