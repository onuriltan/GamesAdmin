import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_USERS_URL

class UserService {
  static getUser (username) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { username: username }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static getUsers () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getUsers`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static async addUser (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(url, data, config)
    } catch (err) {
      res = err.response.data
    }
    return res
  }

  static deleteUser (email) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(`${url}/delete`, { email: email }, config)
  }

  static deactivateUser (email) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.put(`${url}/deactivate`, { email: email }, config)
  }
}
export default UserService
