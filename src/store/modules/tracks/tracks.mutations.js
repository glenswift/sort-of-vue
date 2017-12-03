import _ from 'lodash'
import * as types from '../../mutation-types'

export const mutations = {

  [types.FETCH_TRACKS_BY_PLAYLIST] (state, { id }) {
    state.fetching.tracksByPlaylist = {
      ...state.fetching.tracksByPlaylist,
      [id]: true,
    }
    state.fetched.tracksByPlaylist = {
      ...state.fetched.tracksByPlaylist,
      [id]: false,
    }
  },

  [types.FETCH_TRACKS_BY_PLAYLIST_SUCCESS] (state, { tracks, id }) {
    state.tracksByPlaylist[id] = {
      ...tracks,
      ...{ items: _.map(tracks.items, 'track.id') },
    }
    state.tracksById = _.reduce(tracks.items, (memo, { track }) => {
      memo[track.id] = track
      return memo
    }, state.tracksById)
    state.fetching.tracksByPlaylist = {
      ...state.fetching.tracksByPlaylist,
      [id]: false,
    }
    state.fetched.tracksByPlaylist = {
      ...state.fetched.tracksByPlaylist,
      [id]: true,
    }
    state = _.reduce(tracks.items, (memo, { track }) => {
      memo.fetched.tracksById = {
        ...memo.fetched.tracksById,
        ...{ [track.id]: true },
      }
      return memo
    }, state)
  },

  [types.DELETE_TRACK_FROM_PLAYLIST_SUCCESS] (state, { id, track }) {
    // wtf
    state.tracksByPlaylist = Object.assign({}, { [id]: { items: _.filter(state.tracksByPlaylist[id].items, item => item !== track) }})
  },

}
