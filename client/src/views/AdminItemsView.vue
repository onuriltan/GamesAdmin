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
        <ItemTable :items="games" :deleteItemById="deleteItemById" group="game" :setItemtoUpdate="setItemtoUpdate"/>
        <UpdateGameModal v-if="itemToUpdate" :updateItem="updateGame" :itemToUpdate="itemToUpdate"
                          :resetItem="resetItem" :publishers="publishers" :consoles="consoles" :errorMessage="gameUpdateError"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <AddConsole :getConsoles="getConsoles"/>
        <ItemTable :items="consoles" :deleteItemById="deleteItemById" :setItemtoUpdate="setItemtoUpdate" group="console"/>
        <UpdateConsoleModal v-if="itemToUpdate" :updateItem="updateConsole" :itemToUpdate="itemToUpdate" :errorMessage="consoleUpdateError"
                         :resetItem="resetItem" />
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <AddPublisher :getPublishers="getPublishers"/>
        <ItemTable :items="publishers" :deleteItemById="deleteItemById" :setItemtoUpdate="setItemtoUpdate" group="publisher"/>
        <UpdatePublisherModal v-if="itemToUpdate" :updateItem="updatePublisher" :itemToUpdate="itemToUpdate" :errorMessage="publisherUpdateError"
                            :resetItem="resetItem" />
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
import UpdateGameModal from '../components/UpdateGameModal'
import UpdateConsoleModal from '../components/UpdateConsoleModal'
import UpdatePublisherModal from '../components/UpdatePublisherModal'

export default {
  name: 'AdminItemsView',
  components: {
    ItemTable,
    AddGame,
    AddConsole,
    AddPublisher,
    UpdateGameModal,
    UpdateConsoleModal,
    UpdatePublisherModal
  },
  data () {
    return {
      games: [],
      consoles: [],
      publishers: [],
      itemToUpdate: null,
      gameUpdateError: null,
      consoleUpdateError: null,
      publisherUpdateError: null
    }
  },
  methods: {
    setItemtoUpdate (item) {
      this.itemToUpdate = item
    },
    resetItem () {
      this.itemToUpdate = null
      this.gameUpdateError = null
      this.consoleUpdateError = null
      this.publisherUpdateError = null
    },
    async getGames () {
      this.games = await gameService.getAll()
    },
    async getConsoles () {
      this.consoles = await consoleService.getAll()
    },
    async getPublishers () {
      this.publishers = await publisherService.getAll()
    },
    async updateGame (data) {
      let res = await gameService.update(data)
      if (res.data.message) {
        await this.getGames()
        this.gameUpdateError = null
        $('#gameUpdateModal').modal('toggle')
        this.itemToUpdate = null
      }
      if (res.data.error) {
        this.gameUpdateError = res.data.error
      }
    },
    async updateConsole (data) {
      let res = await consoleService.update(data)
      if (res.data.message) {
        await this.getGames()
        await this.getConsoles()
        this.consoleUpdateError = null
        $('#consoleUpdateModal').modal('toggle')
        this.itemToUpdate = null
      }
      if (res.data.error) {
        this.consoleUpdateError = res.data.error
      }
    },
    async updatePublisher (data) {
      let res = await publisherService.updateByAdmin(data)
      if (res.data.message) {
        await this.getGames()
        await this.getPublishers()
        this.publisherUpdateError = null
        $('#publisherUpdateModal').modal('toggle')
        this.itemToUpdate = null
      }
      if (res.data.error) {
        this.publisherUpdateError = res.data.error
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
    await this.$store.dispatch('checkIsAuthenticated')
    await this.getGames()
    await this.getConsoles()
    await this.getPublishers()
  }
}
</script>
