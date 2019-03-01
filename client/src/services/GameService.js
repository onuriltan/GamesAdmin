import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_GAMES_URL

class GameService {
  static getAll () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + '/getAll', config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static getGames () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/getGames`, config)
        const data = res.data
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  static createGame (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(url, { title }, config)
  }

  static deleteGame (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.delete(`${url}/${title}`, config)
  }

  static deleteGameById (id) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` }
    }
    return axios.post(`${url}/deleteById`, { id } ,config)
  }
}
export default GameService