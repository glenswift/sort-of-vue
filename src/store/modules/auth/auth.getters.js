export const isAuthorized = state => {
  return !!state.token
}

export const isProfileFetching = state => {
  return state.fetching.profile
}

export const isProfileFetched = state => {
  return state.fetched.profile
}

export const getProfile = state => {
  return state.profile
}
