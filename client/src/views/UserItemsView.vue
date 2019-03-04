<template>
  <div class="items-container container mt-5 mb-5">
    <h1 class="text-center mb-5">List of Items</h1>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#game" role="tab" aria-controls="game" aria-selected="true">Games</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#console" role="tab" aria-controls="console" aria-selected="false">Consoles</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#publisher" role="tab" aria-controls="publisher" aria-selected="false">Publishers</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="game" role="tabpanel" aria-labelledby="game-tab">
        <AddGame :getGames="getGames" :publishers="publishers" :consoles="consoles"/>
        <ItemTable :items="games" :deleteItemById="deleteItemById" :publishers="publishers" group="game" :isUser="isUser"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <AddConsole :getConsoles="getConsoles"/>
        <ItemTable :items="consoles" :deleteItemById="deleteItemById" group="console" :isUser="isUser"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <AddPublisher :getPublishers="getPublishers"/>
        <ItemTable :items="publishers" :deleteItemById="deleteItemById" group="publisher" :isUser="isUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import gameService from '../services/GameService'
import consoleService from '../services/ConsoleService'
import publisherService from '../services/PublisherService'
import AddGame from '../components/AddGame'
import AddConsole from '../components/AddConsole'
import AddPublisher from '../components/AddPublisher'
import ItemTable from '../components/ItemTable'

export default {
  name: 'UserItemsView',
  components: {
    ItemTable,
    AddGame,
    AddConsole,
    AddPublisher
  },
  computed: {
    isUser () {
      return this.$store.state.AuthStore.role === 'user'
    }
  },
  data () {
    return {
      games: [],
      consoles: [],
      publishers: [],
      gameItems: []
    }
  },
  methods: {
    async getGames () {
      this.games = await gameService.getAllByUser()
    },
    async getConsoles () {
      this.consoles = await consoleService.getAllByUser()
    },
    async getPublishers () {
      this.publishers = await publisherService.getAllByUser()
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
    }
  },
  async beforeMount () {
    await this.$store.dispatch("checkIsAuthenticated")
    await this.getGames()
    await this.getConsoles()
    await this.getPublishers()
  }
}
</script>
