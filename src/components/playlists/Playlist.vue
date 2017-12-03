<template>
  <div>
      <div v-if="isPlaylistFetched">
          <div>{{playlist.name}}</div>
          <div v-if="isPlaylistTracksFetched" class="tracks">
              <div v-for="track in tracks">
                  <md-card>
                      <md-card-header>
                          <md-card-header-text>
                              <div class="md-title">{{track.name}}</div>
                              <div class="md-subhead">{{track.artists[0].name}}</div>
                          </md-card-header-text>

                          <md-card-media>
                              <img :src="track.album.images[0].url"/>
                          </md-card-media>
                      </md-card-header>
                      <md-card-actions>
                          <md-button
                              @click="deleteTrack(track)"
                          >
                              Delete
                          </md-button>
                      </md-card-actions>
                  </md-card>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Playlist',
  props: ['user', 'id'],
  created() {
    const {user, id} = this.$props
    this.$store.dispatch('fetchPlaylistById', {user, id})
    this.$store.dispatch('fetchTracksByPlaylist', {user, id})
  },
  computed: {
    isPlaylistFetching() {
      const {id} = this.$props
      return this.$store.getters.isPlaylistFetching(id)
    },
    isPlaylistFetched() {
      const {id} = this.$props
      return this.$store.getters.isPlaylistFetched(id)
    },
    isPlaylistTracksFetching() {
      const {id} = this.$props
      return this.$store.getters.isPlaylistTracksFetching(id)
    },
    isPlaylistTracksFetched() {
      const {id} = this.$props
      return this.$store.getters.isPlaylistTracksFetched(id)
    },
    playlist() {
      const {id} = this.$props
      return this.$store.getters.playlistById(id)
    },
    tracks() {
      const {id} = this.$props
      return this.$store.getters.tracksByPlaylist(id)
    },
  },
  methods: {
    deleteTrack(trackRecord) {
      const {user, id} = this.$props
      this.$store.dispatch('deleteTrackFromPlaylist', {user, id, trackRecord})
    },
  },
}
</script>

<style scoped>

</style>
