<template>
  <div class="logs-container container mb-5">
    <h1 class="text-center mb-5">List of Logs</h1>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" @click="getGameLogs">
        <a class="nav-link" id="home-tab" data-toggle="tab" href="#game"
           role="tab" aria-controls="game" aria-selected="false">Game Logs</a>
      </li>
      <li class="nav-item" @click="getConsoleLogs">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#console"
           role="tab" aria-controls="console" aria-selected="false">Console Logs</a>
      </li>
      <li class="nav-item" @click="getPublisherLogs">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#publisher"
           role="tab" aria-controls="publisher" aria-selected="false">Publisher Logs</a>
      </li>
      <li class="nav-item" @click="getCrudLogs">
        <a class="nav-link active" id="crud-tab" data-toggle="tab" href="#crud" role="tab"
           aria-controls="crud" aria-selected="true">CRUD Logs</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade" id="game" role="tabpanel" aria-labelledby="game-tab">
        <form @submit.prevent="deleteNotFoundLogs('game-notfound')" class="d-flex justify-content-start align-items-end mt-5 mb-5">
          <button type="submit" class="btn btn-danger mb-2">Delete Logs</button>
        </form>
        <LogTable :logs="gameNotFoundLogs" category="game-notfound"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <form @submit.prevent="deleteNotFoundLogs('console-notfound')" class="d-flex justify-content-start align-items-end mt-5 mb-5">
          <button type="submit" class="btn btn-danger mb-2">Delete Logs</button>
        </form>
       <LogTable :logs="consoleNotFoundLogs" category="category-notfound"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <form @submit.prevent="deleteNotFoundLogs('publisher-notfound')" class="d-flex justify-content-start align-items-end mt-5 mb-5">
          <button type="submit" class="btn btn-danger mb-2">Delete Logs</button>
        </form>
        <LogTable :logs="publisherNotFoundLogs" category="publisher-notfound"/>
      </div>
      <div class="tab-pane fade show active" id="crud" role="tabpanel" aria-labelledby="contact-tab">
        <form @submit.prevent="deleteLogsByCategory" class="d-flex justify-content-start align-items-end mt-5 mb-5">
          <div class="form-group mx-sm-3 mb-2 mr-2">
            <label for="category" class="mr-3">Category</label>
            <select class="form-control" id="category" v-model="deleteCategory" style="width: 200px">
              <option value="game-crud">Game</option>
              <option value="console-crud">Console</option>
              <option value="publisher-crud">Publisher</option>
            </select>
          </div>
          <button type="submit" class="btn btn-danger mb-2">Delete Category</button>
        </form>
        <LogTable :logs="crudLogs" category="crud"/>
      </div>
    </div>
  </div>
</template>

<script>
import LogService from '../services/LogService'
import LogTable from '../components/LogTable'
export default {
  name: 'Logs',
  components: {
    LogTable
  },
  data () {
    return {
      gameNotFoundLogs: [],
      consoleNotFoundLogs: [],
      publisherNotFoundLogs: [],
      crudLogs: [],
      deleteCategory: ''
    }
  },
  methods: {
    async getGameLogs () {
      this.gameNotFoundLogs = await LogService.getLogsByType('game-notfound')
    },
    async getConsoleLogs () {
      this.consoleNotFoundLogs = await LogService.getLogsByType('console-notfound')
    },
    async getPublisherLogs () {
      this.publisherNotFoundLogs = await LogService.getLogsByType('publisher-notfound')
    },
    async getCrudLogs () {
      this.crudLogs = await LogService.getCrudLogs()
    },
    async deleteLogsByCategory () {
      await LogService.deleteByCategory(this.deleteCategory)
      this.getCrudLogs()
    },
    async deleteNotFoundLogs (category) {
      await LogService.deleteByCategory(category)
      if (category === 'game-notfound') this.getGameLogs()
      if (category === 'console-notfound') this.getConsoleLogs()
      if (category === 'publisher-notfound') this.getPublisherLogs()
    }
  },
  mounted () {
    this.getGameLogs()
    this.getConsoleLogs()
    this.getPublisherLogs()
    this.getCrudLogs()
  }
}
</script>

<style scoped lang="scss">
 @import "../styles/components/Logs.scss";
</style>
