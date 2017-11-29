<template>
  <div class="hello">
    <h2>think you smart?</h2>
    <div v-if="isPlaylistsFetched">
      <p v-for="playlist in playlists">
        <router-link :to="{ name: 'Playlist', params: {user: user, id: playlist.id} }">
          {{playlist.name}}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Playlists',
  props: ['user'],
  created() {
    const {user} = this.$props
    this.$store.dispatch('fetchPlaylistsByUser', user)
  },
  computed: {
    playlists() {
      const {user} = this.$props
      return this.$store.getters.playlistsByUser(user)
    },
    isPlaylistsFetching() {
      const {user} = this.$props
      return this.$store.getters.isUserPlaylistsFetching(user)
    },
    isPlaylistsFetched() {
      const {user} = this.$props
      return this.$store.getters.isUserPlaylistsFetched(user)
    },
  },
}
</script>

<style scoped>

</style>
