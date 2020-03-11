// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import store from './store'
// import router from './router'
import App from './App'
import { VueHammer } from 'vue2-hammer'
import './assets/css/index.css'

Vue.config.productionTip = false

Vue.use(VueOnsen)
Vue.use(VueHammer) 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  template: '<App/>',
  components: { App }
})
