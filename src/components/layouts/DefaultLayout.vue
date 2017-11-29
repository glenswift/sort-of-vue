<template>
  <div>
    <a
      v-show="!isAuthorized"
      @click="startSignFlow()"
      href="javascript:void(0)"
    >login</a>
    <div v-if="isAuthorized && isProfileFetched">
      <a @click="signOut()" href="javascript:void(0)">logout</a>
      <router-link :to="{ name: 'Playlists', params: {user: profile.id}}">
        {{profile.display_name}}

      </router-link>

      <div>
        <router-view></router-view>
      </div>
    </div>
    <div>or check it {{isProfileFetched}}</div>
    <hr />
  </div>
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
