import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import VueForceNextTick from 'vue-force-next-tick'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import '@a/styles/scss/index.scss'
import '@a/styles/css/index.css'

import loading from '@a/images/loading.gif'
import error from '@a/images/error.gif'

Vue.use(VueLazyload, { error, loading })
Vue.use(VueForceNextTick)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
