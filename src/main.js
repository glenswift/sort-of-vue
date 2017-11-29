import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

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
