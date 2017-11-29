import Spotify from '../../../services/SpotifyService'
import * as types from '../../mutation-types'

export const fetchTracksByPlaylist = async ({ commit }, { user, id }) => {
  commit(types.FETCH_TRACKS_BY_PLAYLIST, { user, id })
  try {
    const tracks = await Spotify.fetchTracksByPlaylist(user, id)
    commit(types.FETCH_TRACKS_BY_PLAYLIST_SUCCESS, { user, id, tracks })
  } catch (err) {
    console.log(err)
  }
}

export const deleteTrackFromPlaylist = async ({ commit }, { user, id, trackRecord }) => {
  try {
    await Spotify.deleteTrackFromPlaylist(user, id, trackRecord.uri)
    commit(types.DELETE_TRACK_FROM_PLAYLIST_SUCCESS, { id, track: trackRecord.id })
  } catch (err) {
    console.log(err)
  }
}
