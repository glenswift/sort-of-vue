<template>
  <div v-if="isPlaylistsFetched">
    <div v-for="playlist in playlists">
      <router-link :to="{ name: 'Playlist', params: {user: user, id: playlist.id} }">
        <md-card >
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{playlist.name}}</div>
              <div class="md-subhead">playlist</div>
            </md-card-header-text>

            <md-card-media>
              <img :src="playlist.images[0].url" />
            </md-card-media>
          </md-card-header>
        </md-card>
      </router-link>
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
  a {
    text-decoration: none !important;
    color: inherit;
  }
</style>
