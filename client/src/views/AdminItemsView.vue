<template>
  <AdminItems :games="games" :consoles="consoles"
              :publishers="publishers" :deleteItemById="deleteItemById" :addItem="addItem"/>
</template>

<script>
import AdminItems from '../components/AdminItems'
import gameService from '../services/GameService'
import consoleService from '../services/ConsoleService'
import publisherService from '../services/PublisherService'

export default {
  name: 'AdminItemsView',
  components: {
    AdminItems
  },
  data () {
    return {
      games: [],
      consoles: [],
      publishers: []
    }
  },
  methods: {
    async getGames () {
      this.games = await gameService.getAll()
    },
    async getConsoles () {
      this.consoles = await consoleService.getAll()
    },
    async getPublishers () {
      this.publishers = await publisherService.getAll()
    },
    async deleteItemById (group, id) {
      if (group === 'game') {
        await gameService.deleteGameById(id)
        await this.getGames()
      }
      if (group === 'console') {
        await consoleService.deleteConsoleById(id)
        await this.getConsoles()
      }
      if (group === 'publisher') {
        await publisherService.deletePublisherById(id)
        await this.getPublishers()
      }
    },
    async addItem (group, title) {
      if (group === 'game') {
        await gameService.createGame(title)
        await this.getGames()
      }
      if (group === 'console') {
        await consoleService.createConsole(title)
        await this.getConsoles()
      }
      if (group === 'publisher') {
        await publisherService.createPublisher(title)
        await this.getPublishers()
      }
    }
  },

  async beforeMount () {
    await this.getGames()
    await this.getConsoles()
    await this.getPublishers()
  }
}
</script>
