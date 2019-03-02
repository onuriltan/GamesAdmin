<template>
  <form @submit.prevent="addGame" class="mb-5 mt-5">
    <div class="alert alert-danger" v-if="error">
      {{error}}
    </div>
    <div class="alert alert-success" v-if="message">
      {{message}}
    </div>
    <div class="form-row">
      <div class="col">
        <label for="addgame" class="mr-2">Game Name</label>
        <input type="text" class="form-control" id="addgame" v-model="data.name">
      </div>
      <div class="col">
        <label for="addReleaseDate" class="mr-2">Release Date</label>
        <input type="date" class="form-control" id="addReleaseDate" v-model="data.releaseDate">
      </div>
      <div class="col">
        <label for="role">Publisher</label>
        <select class="form-control" id="role" v-model="data.publisherId">
          <option v-for="pub in publishers" :value="pub._id">{{pub.name}}</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Add Game</button>
  </form>
</template>

<script>
import gameService from '../services/GameService'
export default {
  name: "AddGame",
  props: {
    getGames: Function,
    publishers: Array
  },
  data() {
    return {
      data: {
        name: null,
        releaseDate: null,
        publisherId: null
      },
      error: null,
      message: null
    }
  },
  methods: {
    async addGame() {
      this.error = null
      this.message = null
      let res = await gameService.createGame(this.data)
      if(res.data.error) this.error = res.data.error
      if(res.data.message) this.message = res.data.message
      this.getGames()
      setTimeout( () => {
        this.error = null
        this.message = null
      },3000)
    }
  }
}
</script>

<style scoped>

</style>
