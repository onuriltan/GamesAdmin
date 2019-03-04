import authService from '../../services/AuthService'

import router from '../../router'
import jwtDecode from 'jwt-decode'

const state = {
  isAuthenticated: false,
  sessionExpired: false,
  userEmail: null,
  role: null
}

const AuthStore = {
  state,
  getters: {
    isAuthenticated () {
      return state.isAuthenticated
    },
    getRole () {
      return state.role
    },
    isAdmin () {
      return state.role === 'admin'
    },
    isUser () {
      return state.role === 'user'
    }
  },
  actions: {
    logout (context) {
      context.commit('clearStateandToken')
      router.push('/login')
    },
    login (context, credentials) {
      return new Promise(resolve => {
        authService.login(credentials)
          .then((response) => {
            context.commit('updateIsAuthenticated', response)
            return resolve(response)
          })
          .catch((response) => { return resolve(response) })
      })
    },
    loadUser (context) {
      context.commit('loadUser')
    },

    checkIsAuthenticated (context) {
      context.commit('checkIsAuthenticated')
    }
  },
  mutations: {
    clearStateandToken (state) {
      window.localStorage.removeItem('token')
      state.isAuthenticated = false
      state.sessionExpired = false
      state.userEmail = null
      state.role = null
    },

    checkIsAuthenticated (state) {
      let token = window.localStorage.getItem('token')
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      if (token != null) {
        expiration = jwtDecode(token).exp
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp < 0) {
        window.localStorage.deleteItem('token')
        state.sessionExpired = true
        state.isAuthenticated = false
        router.push('/login')
        state.sessionExpired = false
        state.userEmail = null
        state.role = null
      }
    },

    updateIsAuthenticated (state, response) {
      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token)
        state.isAuthenticated = true
        state.sessionExpired = false
        state.userEmail = response.data.user.email
        state.role = response.data.user.role
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    },

    loadUser (state) {
      let token = window.localStorage.getItem('token')
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      if (token != null) {
        expiration = jwtDecode(token).exp
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true
        state.sessionExpired = false
      }
    }
  }
}

export default AuthStore
