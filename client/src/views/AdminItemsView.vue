<template>
  <div class="items-container container mt-5">
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
        <AddGame :getGames="getGames" :publishers="publishers" />
        <ItemTable :items="gameItems" :deleteItemById="deleteItemById" group="game"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <AddConsole :getConsoles="getConsoles"/>
        <ItemTable :items="consoleItems" :deleteItemById="deleteItemById" group="console"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <AddPublisher :getPublishers="getPublishers"/>
        <ItemTable :items="publisherItems" :deleteItemById="deleteItemById" group="publisher"/>
      </div>
    </div>
  </div>
</template>

<script>
import gameService from '../services/GameService'
import consoleService from '../services/ConsoleService'
import publisherService from '../services/PublisherService'
import userService from '../services/UserService'
import AddGame from '../components/AddGame'
import AddConsole from '../components/AddConsole'
import AddPublisher from '../components/AddPublisher'
import ItemTable from '../components/ItemTable'

export default {
  name: 'AdminItemsView',
  components: {
    ItemTable,
    AddGame,
    AddConsole,
    AddPublisher
  },
  data () {
    return {
      games: [],
      consoles: [],
      publishers: [],
      users: [],
      gameItems: [],
      consoleItems: [],
      publisherItems: []
    }
  },
  methods: {
    async getUsers () {
      this.users = await userService.getUsers()
    },
    async getGames () {
      this.games = await gameService.getAll()
      this.prepareGames()
    },
    async getConsoles () {
      this.consoles = await consoleService.getAll()
      this.prepareConsoles()
    },
    async getPublishers () {
      this.publishers = await publisherService.getAll()
      this.preparePublishers()
    },
    prepareGames () {
      let theItem = null
      this.gameItems = []
      for (let item of this.games) {
        for (let user of this.users) {
          if (item.userId === user._id) {
            theItem = item
            theItem.email = user.email
          }
        }
        for (let publisher of this.publishers) {
          if (item.publisherId === publisher._id) {
            theItem.publisherName = publisher.name
          }
        }
        this.gameItems.push(theItem);
        theItem = null
      }
    },
    prepareConsoles () {
      let theItem = null
      this.consoleItems = []
      for (let item of this.consoles) {
        for (let user of this.users) {
          if (item.userId === user._id) {
            theItem = item
            theItem.email = user.email
            this.consoleItems.push(theItem);
            theItem = null
          }
        }
      }
    },
    preparePublishers () {
      let theItem = null
      this.publisherItems = []
      for (let item of this.publishers) {
        for (let user of this.users) {
          if (item.userId === user._id) {
            theItem = item
            theItem.email = user.email
            this.publisherItems.push(theItem);
            theItem = null
          }
        }
      }
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
    await this.getUsers()
    await this.getGames()
    await this.getConsoles()
    await this.getPublishers()
    await this.prepareGames()
    await this.prepareConsoles()
    await this.preparePublishers()
  }
}
</script>
