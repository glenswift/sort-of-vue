import Spotify from '../../../services/SpotifyService'
import * as types from '../../mutation-types'

export const startSignInFlow = () => {
  Spotify.startLoginFlow()
}

export const signOut = () => {
  Spotify.signOut()
}

export const finishSignInFlow = ({ commit }, token) => {
  Spotify.finishSignInFlow(token)
  commit(types.FINISH_SIGN_IN, { token })
}

export const fetchProfile = async ({ commit }) => {
  commit(types.FETCH_PROFILE)
  try {
    const profile = await Spotify.fetchUser()
    commit(types.FETCH_PROFILE_SUCCESS, { profile })
  } catch (err) {
    console.log(err)
  }
}
