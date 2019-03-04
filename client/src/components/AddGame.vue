<template>
  <form @submit.prevent="addGame" class="mb-5 mt-5">
    <div style="height: 60px">
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{error}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-if="message" class="alert alert-success alert-dismissible fade show" role="alert">
        {{message}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <label for="addgame" class="mr-2">Game Name</label>
        <input type="text" class="form-control" id="addgame" v-model="data.name">
      </div>
      <div class="col">
        <label for="addReleaseDate" class="mr-2">Release Date</label>
        <input type="date" class="form-control" id="addReleaseDate" v-model="data.dateReleased">
      </div>
    </div>
    <div class="form-row mt-3">
      <div class="col">
        <label for="roles">Publisher</label>
        <select class="form-control" id="roles" v-model="data.publisherId">
          <option v-for="pub in publishers" :value="pub._id">{{pub.name}}</option>
        </select>
      </div>
      <div class="col">
        <label for="consoles">Console</label>
        <select class="form-control" id="consoles" v-model="data.consoleId">
          <option v-for="console in consoles" :value="console._id">{{console.name}}</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Add Game</button>
  </form>
</template>

<script>
import gameService from '../services/GameService'

export default {
  name: 'AddGame',
  props: {
    getGames: Function,
    publishers: Array,
    consoles: Array
  },
  data() {
    return {
      data: {
        name: null,
        dateReleased: null,
        publisherId: null,
        consoleId: null
      },
      error: null,
      message: null
    }
  },
  methods: {
    async addGame() {
      this.error = null
      this.message = null
      let res = await gameService.createByUser(this.data)
      if (res.data.error) this.error = res.data.error
      if (res.data.message) this.message = res.data.message
      this.getGames()
    }
  }
}
</script>

<style scoped>

</style>
