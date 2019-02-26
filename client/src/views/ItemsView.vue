<template>
  <Items pageName="games"
         :isLoading="isLoading"
         :items="games"
         :getItems="getGames"
         :createItem="createGame"
         :deleteItem="deleteGame"
  />
</template>

<script>
import Items from '../components/Items'
import GamesService from '../services/GamesService'

export default {
  name: 'ItemsView',
  components: {
    Items
  },
  data () {
    return {
      isLoading: false,
      games: []
    }
  },
  methods: {
    async getGames () {
      this.isLoading = true
      this.games = await GamesService.getGames()
      this.isLoading = false
    },
    async createGame (gameTitle) {
      this.isLoading = true
      await GamesService.createGame(gameTitle)
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
  beforeMount () {
    this.getGames()
  }
}
</script>
