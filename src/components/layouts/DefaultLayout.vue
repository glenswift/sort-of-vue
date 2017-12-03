<template>
  <md-app>
    <md-app-toolbar class="md-primary">
      <span class="md-title">This is sort of vue</span>
    </md-app-toolbar>
    <md-app-content>
      <md-button
          v-show="!isAuthorized"
          @click="startSignFlow()"
          class="md-raised"
      >
        Login
      </md-button>
      <md-button
          v-show="isAuthorized && isProfileFetched"
          @click="signOut()"
          class="md-raised"
      >
        Logout
      </md-button>
      <hr />
      <div v-if="isAuthorized && isProfileFetched">
          <h2>
            <span>check playlists of</span>
            <router-link :to="{ name: 'Playlists', params: {user: profile.id}}">
              {{profile.display_name}}
            </router-link>
          </h2>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import qs from 'qs'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'DefaultLayout',
  props: [],
  beforeCreate() {
    const {access_token: token} = qs.parse(this.$route.hash.slice(1))

    if (token) {
      return this.$store.dispatch('finishSignInFlow', token)
    }
  },
  created() {
    const {isAuthorized, isProfileFetching, isProfileFetched} = this
    if (isAuthorized && !isProfileFetching && !isProfileFetched) {
      this.$store.dispatch('fetchProfile')
    }
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized',
      isProfileFetching: 'isProfileFetching',
      isProfileFetched: 'isProfileFetched',
      profile: 'getProfile',
    }),
  },
  methods: {
    startSignFlow() {
      this.$store.dispatch('startSignInFlow')
    },
    signOut() {
      this.$store.dispatch('signOut')
    },
  }
}
</script>

<style scoped>

</style>
