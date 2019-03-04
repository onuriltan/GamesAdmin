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
        <LogTable :logs="gameNotFoundLogs" category="game-notfound"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
       <LogTable :logs="consoleNotFoundLogs" category="category-notfound"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <LogTable :logs="publisherNotFoundLogs" category="publisher-notfound"/>
      </div>
      <div class="tab-pane fade show active" id="crud" role="tabpanel" aria-labelledby="contact-tab">
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
      crudLogs: []
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
