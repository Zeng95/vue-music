import Vue from 'vue'
import Vuex from 'vuex'
import singers from './modules/singers'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    singers
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
