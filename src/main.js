// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import store from './store'
import router from './router'
import App from './App'
import './assets/css/index.css'
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.config.productionTip = false

Vue.use(Vue2TouchEvents)
Vue.use(VueOnsen)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
}).$mount('#app')
