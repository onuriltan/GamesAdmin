import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_PUBLISHERS_URL

class PublishersService{

  static getPublisher (publishername) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { publishername: publishername }
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

  static getPublishers () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getPublishers`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static createPublisher (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
    }
    return axios.post(url, { title }, config)
  }

  static deletePublisher (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
    }
    return axios.delete(`${url}/${title}`, config)
  }

}
export default PublishersService
