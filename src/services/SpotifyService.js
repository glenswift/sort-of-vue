import request from 'superagent'

class Spotify {

  static BASE_URL = 'https://api.spotify.com/v1';
  static SCOPES_REQUIRED = [
    'user-read-private',
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public',
  ];

  constructor() {
    this.token = localStorage.getItem('sortofvue::spotify::token') || null
  }

  async get(uri) {
    try {
      const { body } = await request
        .get(Spotify.BASE_URL + uri)
        .set('Authorization', 'Bearer ' + this.token)
      return body
    } catch (err) {
      return this.handleApiError(err)
    }
  }

  async del(uri, payload = {}) {
    try {
      const { body } = await request
        .del(Spotify.BASE_URL + uri)
        .set('Authorization', 'Bearer ' + this.token)
        .send(payload)
      return body
    } catch (err) {
      return this.handleApiError(err)
    }
  }

  handleApiError(err) {
    switch (err.status) {
      case 401:
        this.signOut()
        break
      default:
        throw new Error(err)
    }
  }

  startLoginFlow() {
    if (this.token) {
      return
    }
    document.location = [
      'https://accounts.spotify.com/authorize/?',
      'client_id=',
      window.sortofvue.spotify.clientId,
      '&response_type=token',
      '&redirect_uri=http://localhost:8080/login/callback',
      '&scope=',
      encodeURIComponent(Spotify.SCOPES_REQUIRED.join(' ')),
    ].join('')
  }

  finishSignInFlow(token) {
    this.token = token
    localStorage.setItem('sortofvue::spotify::token', token)
    if (document.location !== '/') {
      document.location = '/'
    }
  }

  signOut() {
    this.token = null
    localStorage.removeItem('sortofvue::spotify::token')
    document.location = '/'
  }

  fetchUser() {
    return this.get('/me')
  }

  fetchPlaylistById(user, playlist) {
    return this.get(`/users/${user}/playlists/${playlist}`)
  }

  fetchPlaylistsByUser(user) {
    return this.get(`/users/${user}/playlists`)
  }

  fetchTracksByPlaylist(user, playlist) {
    return this.get(`/users/${user}/playlists/${playlist}/tracks`)
  }

  deleteTrackFromPlaylist(user, playlist, track) {
    return this.del(`/users/${user}/playlists/${playlist}/tracks`, {
      tracks: [{ uri: track }],
    })
  }

}

const instance = new Spotify()
export default instance
