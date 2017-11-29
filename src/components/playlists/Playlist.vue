<template>
  <div v-if="isPlaylistFetched">
    {{playlist.name}}
    <hr />
    <div v-if="isPlaylistTracksFetched">
      <p v-for="track in tracks">
        {{track.name}} <a @click="deleteTrack(track)" href="javascript:void(0)">Delete nahui</a>
      </p>
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
