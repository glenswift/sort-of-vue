import Spotify from '../../../services/SpotifyService'
import * as types from '../../mutation-types'

export const fetchPlaylistById = async ({ commit }, { user, id }) => {
  commit(types.FETCH_PLAYLIST_BY_ID, { user, id })
  try {
    const playlist = await Spotify.fetchPlaylistById(user, id)
    commit(types.FETCH_PLAYLIST_BY_ID_SUCCESS, { user, id, playlist })
  } catch (err) {
    // console.log(err)
    commit(types.FETCH_PLAYLIST_BY_ID_FAILED, { user, id })
  }
}

export const fetchPlaylistsByUser = async ({ commit }, user) => {
  commit(types.FETCH_PLAYLISTS_BY_USER, { user })
  try {
    const playlists = await Spotify.fetchPlaylistsByUser(user)
    commit(types.FETCH_PLAYLISTS_BY_USER_SUCCESS, { playlists, user })
  } catch (err) {
    console.log(err)
    commit(types.FETCH_PLAYLISTS_BY_USER_FAILED, { user })
  }
}
