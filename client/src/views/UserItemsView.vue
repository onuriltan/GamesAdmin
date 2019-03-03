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
        <AddGame :getGames="getGamesByUser" :publishers="this.publishers"/>
        <ItemTable :items="gameItems" :deleteItemById="deleteItemById" :publishers="publishers" group="game" :userEmail="userEmail"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <AddConsole :getConsoles="getConsoles"/>
        <ItemTable :items="consoles" :deleteItemById="deleteItemById" group="console" :userEmail="userEmail"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <AddPublisher :getPublishers="getPublishers"/>
        <ItemTable :items="publishers" :deleteItemById="deleteItemById" group="publisher" :userEmail="userEmail"/>
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
    userEmail () {
      return this.$store.state.AuthStore.userEmail
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
    async getGamesByUser () {
      this.games = await gameService.getAllByUser()
      this.prepareGames()
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
        await this.getGamesByUser()
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
    prepareGames () {
      let theItem = null
      this.gameItems = []
      for (let item of this.games) {
        for (let publisher of this.publishers) {
          if (item.publisherId === publisher._id) {
            theItem = item
            theItem.publisherName = publisher.name
            this.gameItems.push(theItem);
            theItem = null
          }
        }
      }
    },
  },
  async mounted () {
    await this.getGamesByUser()
    await this.getConsoles()
    await this.getPublishers()
    this.prepareGames()
  }
}
</script>
