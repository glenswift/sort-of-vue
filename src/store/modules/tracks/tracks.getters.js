import _ from 'lodash'

export const isPlaylistTracksFetching = state => {
  return playlist => {
    return state.fetching.tracksByPlaylist[playlist]
  }
}

export const isPlaylistTracksFetched = state => {
  return playlist => {
    return state.fetched.tracksByPlaylist[playlist]
  }
}

export const trackById = state => {
  return id => {
    return state.tracksById[id]
  }
}

export const tracksByPlaylist = state => {
  return playlist => {
    return _.map(state.tracksByPlaylist[playlist].items, trackById(state))
  }
}
