import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '@a/styles/scss/index.scss'
import '@a/styles/css/index.css'

import loadimage from '@a/images/loading.gif'
import errorimage from '@a/images/error.gif'

Vue.use(VueLazyload, {
  error: errorimage,
  loading: loadimage
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
