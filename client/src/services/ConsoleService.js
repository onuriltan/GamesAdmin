import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_CONSOLES_URL

class ConsoleService {
  static getConsole (consolename) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { consolename: consolename }
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

  static getConsoles () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getConsoles`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static createConsole (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(url, { title }, config)
  }

  static deleteConsole (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.delete(`${url}/${title}`, config)
  }
}
export default ConsoleService
