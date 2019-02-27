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
import GameService from '../services/GameService'

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
      this.games = await GameService.getGames()
      this.isLoading = false
    },
    async createGame (gameTitle) {
      this.isLoading = true
      await GameService.createGame(gameTitle)
      await this.getGames()
      this.isLoading = false
    },
    async deleteGame (gameTitle) {
      this.isLoading = true
      await GameService.deleteGame(gameTitle)
      await this.getGames()
      this.isLoading = false
    }
  },
  beforeMount () {
    this.getGames()
  }
}
</script>
