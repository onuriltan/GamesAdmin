import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import AuthStore from './modules/AuthStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  modules: {
    AuthStore
  }
})

export default store
