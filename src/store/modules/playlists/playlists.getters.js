import _ from 'lodash'

export const isPlaylistFetching = state => {
  return id => {
    return state.fetching.playlistsById[id]
  }
}

export const isPlaylistFetched = state => {
  return id => {
    return state.fetched.playlistsById[id]
  }
}

export const isUserPlaylistsFetching = state => {
  return user => {
    return state.fetching.playlistsByUser[user]
  }
}

export const isUserPlaylistsFetched = state => {
  return user => {
    return state.fetched.playlistsByUser[user]
  }
}

export const playlistById = state => {
  return id => {
    return state.playlistsById[id]
  }
}

export const playlistsByUser = state => {
  return user => {
    return _.map(state.playlistsByUser[user].items, playlistById(state))
  }
}
