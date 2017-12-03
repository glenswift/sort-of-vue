import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import auth from './modules/auth'
import playlists from './modules/playlists'
import tracks from './modules/tracks'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    auth,
    playlists,
    tracks,
  },
  strict: false,
  plugins: [],
})
