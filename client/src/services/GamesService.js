import axios from 'axios'
import Store from '../store/index'

const url = process.env.VUE_APP_GAMES_URL

class GamesService {

  static getGame (gamename) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
      params: { gamename: gamename }
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

  static getGames () {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
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
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
    }
    return axios.post(url, { title }, config)
  }

  static deleteGame (title) {
    Store.dispatch('checkIsAuthenticated')
    let config = {
      headers: { 'Authorization': `Bearer ${window.localStorage.getItem('token')}` },
    }
    return axios.delete(`${url}/${title}`, config)
  }

}
export default GamesService
