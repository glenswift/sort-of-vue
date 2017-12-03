import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
// import 'es6-set/implement'
// import VueMaterial from 'vue-material'
Vue.use(Vuex)

// Vue.use(VueMaterial)

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
