import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueMaterial)

window.sortofvue = {
  spotify: {
    clientId: 'aba7bccd110a42ee856769da8d2b4f47',
  },
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
