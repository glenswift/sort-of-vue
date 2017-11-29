import _ from 'lodash'
import * as types from '../../mutation-types'

export const mutations = {

  [types.FETCH_PLAYLIST_BY_ID] (state, { user, id }) {
    state.fetching.playlistsById = {
      ...state.fetching.playlistsById,
      [id]: true,
    }
    state.fetched.playlistsById = {
      ...state.fetched.playlistsById,
      ...{ [id]: false },
    }
  },

  [types.FETCH_PLAYLIST_BY_ID_SUCCESS] (state, { user, id, playlist }) {
    state.fetching.playlistsById = {
      ...state.fetching.playlistsById,
      ...{ [id]: false },
    }
    state.fetched.playlistsById = {
      ...state.fetched.playlistsById,
      ...{ [id]: true },
    }
    state.playlistsById = {
      ...state.playlistsById,
      ...{ [id]: playlist },
    }
  },

  [types.FETCH_PLAYLISTS_BY_USER] (state, { user }) {
    state.fetching.playlistsByUser = {
      ...state.fetching.playlistsByUser,
      [user]: true,
    }
    state.fetched.playlistsByUser = {
      ...state.fetched.playlistsByUser,
      ...{ [user]: false },
    }
  },

  [types.FETCH_PLAYLISTS_BY_USER_SUCCESS] (state, { playlists, user }) {
    state.playlistsByUser[user] = {
      ...playlists,
      ...{ items: _.map(playlists.items, 'id') },
    }
    state.playlistsById = _.reduce(playlists.items, (memo, playlist) => {
      memo[playlist.id] = playlist
      return memo
    }, state.playlistsById)
    state.fetching.playlistsByUser = {
      ...state.fetching.playlistsByUser,
      [user]: false,
    }
    state.fetched.playlistsByUser = {
      ...state.fetched.playlistsByUser,
      ...{ [user]: true },
    }
    state = _.reduce(playlists.items, (memo, playlist) => {
      memo.fetched.playlistsById = {
        ...memo.fetched.playlistsById,
        ...{ [playlist.id]: true },
      }
      return memo
    }, state)
  },

}
