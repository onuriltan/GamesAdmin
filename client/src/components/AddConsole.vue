<template>
  <form @submit.prevent="addConsole" class="mb-5 mt-5">
    <div class="alert alert-danger" v-if="error">
      {{error}}
    </div>
    <div class="alert alert-success" v-if="message">
      {{message}}
    </div>
    <div class="form-row">
      <div class="col">
        <label for="addConsole" class="mr-2">Console Name</label>
        <input type="text" class="form-control" id="addConsole" v-model="data.name">
      </div>
      <div class="col">
        <label for="addCpu" class="mr-2">CPU</label>
        <input type="text" class="form-control" id="addCpu" v-model="data.cpu">
      </div>
    </div>
    <div class="form-row mt-2">
      <div class="col">
        <label for="addRam" class="mr-2">RAM</label>
        <input type="text" class="form-control" id="addRam" v-model="data.ram">
      </div>
      <div class="col">
        <label for="addYear" class="mr-2">Year</label>
        <input type="text" class="form-control" id="addYear" v-model="data.year">
      </div>
    </div>
    <div class="form-row mt-2">
      <div class="col">
        <label for="addComment" class="mr-2">Comment</label>
        <input type="text" class="form-control" id="addComment" v-model="data.comment">
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Add Console</button>
  </form>
</template>

<script>
import consoleService from '../services/ConsoleService'
export default {
  name: 'AddConsole',
  props: {
    getConsoles: Function
  },
  data () {
    return {
      data: {
        name: null,
        cpu: null,
        ram: null,
        year: null,
        comment: null
      },
      error: null,
      message: null
    }
  },
  methods: {
    async addConsole () {
      this.error = null
      this.message = null
      let res = await consoleService.createConsole(this.data)
      if (res.data.error) this.error = res.data.error
      if (res.data.message) this.message = res.data.message
      this.getConsoles()
    }
  }
}
</script>

<style scoped>

</style>
