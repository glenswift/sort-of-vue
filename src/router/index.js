import Vue from 'vue'
import Router from 'vue-router'
import { DefaultLayout } from '../components/layouts'
import { Playlists, Playlist } from '../components/playlists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: 'user/:user/playlists',
          name: 'Playlists',
          component: Playlists,
          props: true,
        },
        {
          path: 'user/:user/playlist/:id',
          name: 'Playlist',
          component: Playlist,
          props: true,
        },
      ],
    },
    {
      path: '/login/callback',
      name: 'FinishAuthentication',
      component: DefaultLayout,
      props: true,
    },
  ],
  mode: 'history',
})
