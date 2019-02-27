import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_LOGS_URL

class LogService {
  static getLogs (api) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getLogs/${api}`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default LogService
