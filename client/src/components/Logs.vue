<template>
  <div class="logs-container container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#game" role="tab" aria-controls="game" aria-selected="true">Game Logs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#console" role="tab" aria-controls="console" aria-selected="false">Console Logs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#publisher" role="tab" aria-controls="publisher" aria-selected="false">Publisher Logs</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="game" role="tabpanel" aria-labelledby="game-tab">
        <LogTable :logs="gameLogs" />
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
       <LogTable :logs="consoleLogs" />
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <LogTable :logs="publisherLogs" />
      </div>
    </div>
  </div>
</template>

<script>
import LogService from '../services/LogService'
import LogTable from '../components/LogTable'
export default {
  name: "Logs",
  components: {
    LogTable
  },
  data () {
    return {
      gameLogs: [],
      consoleLogs: [],
      publisherLogs: []
    }
  },
  methods: {
    async getLogs () {
      this.gameLogs = await LogService.getLogs('game')
      this.consoleLogs = await LogService.getLogs('console')
      this.publisherLogs = await LogService.getLogs('publisher')
    },
  },
  mounted() {
    this.getLogs()
  }
}
</script>

<style scoped lang="scss">
 @import "../styles/components/Logs.scss";
</style>
