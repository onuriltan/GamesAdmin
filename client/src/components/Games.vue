<template>
  <div class="games-list container">
    <h1 class="text-center mb-5">List of Games</h1>
    <form class="input-group mb-5" @submit.prevent="createGame">
      <input type="text" class="form-control" placeholder="Create a game.." v-model="newGameTitle">
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">OK</button>
      </div>
    </form>
    <ul class="list-group games-list__view" v-for="game in this.games">
      <li class="list-group-item games-list__view__title">
        {{game.title}}
        <button class="btn btn-danger" style="float: right" type="button" @click="deleteGame(game.title)">DELETE</button>
      </li>
    </ul>
  </div>
</template>

<script>
import GamesService from '../services/GamesService'
export default {
  name: "Games",
  data () {
    return {
      isLoading: false,
      games: [],
      newGameTitle: ''
    }
  },
  methods: {
    async getGames () {
      this.isLoading = true
      this.games = await GamesService.getGames()
      this.isLoading = false
    },
    async createGame () {
      this.isLoading = true
      await GamesService.createGame(this.newGameTitle)
      await this.getGames()
      this.isLoading = false
    },
    async deleteGame (gameTitle) {
      this.isLoading = true
      await GamesService.deleteGame(gameTitle)
      await this.getGames()
      this.isLoading = false
    }
  },
  beforeMount() {
    this.getGames()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Games";
</style>
