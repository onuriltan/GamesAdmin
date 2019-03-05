import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_PUBLISHERS_URL

class PublisherService {

  static getAll () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getAll`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static async create (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(`${url}/create`, data, config)
    } catch (err) {
      res = err.response
    }
    return res
  }

  static deletePublisherById (id) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(`${url}/deleteById`, { id }, config)
  }

  static async update (data) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    let res = null
    try {
      res = await axios.post(`${url}/update`, data, config)
    } catch (err) {
      res = err.response
    }
    return res
  }
}
export default PublisherService
