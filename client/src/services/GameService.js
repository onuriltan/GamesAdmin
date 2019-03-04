import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_GAMES_URL

class GameService {
  static getAllByAdmin () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + '/getAllByAdmin', config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static getAllByUser () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getAllByUser`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static async createByUser (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(`${url}/createByUser`, data, config)
    } catch (err) {
      res = err.response
    }
    return res
  }

  static deleteGameById (id) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(`${url}/deleteById`, { id }, config)
  }

  static async editByUser (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(`${url}/editByUser`, data, config)
    } catch (err) {
      res = err.response
    }
    return res
  }

  static async editByAdmin (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(`${url}/editByAdmin`, data, config)
    } catch (err) {
      res = err.response
    }
    return res
  }
}
export default GameService
