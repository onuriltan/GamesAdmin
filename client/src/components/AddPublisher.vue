<template>
  <form @submit.prevent="addPublisher" class="mb-5 mt-5">
    <div class="alert alert-danger" v-if="error">
      {{error}}
    </div>
    <div class="alert alert-success" v-if="message">
      {{message}}
    </div>
    <div class="form-row">
      <div class="col">
        <label for="addgame" class="mr-2">Publisher Name</label>
        <input type="text" class="form-control" id="addgame" v-model="data.name">
      </div>
      <div class="col">
        <label for="addLocation" class="mr-2">Location</label>
        <input type="text" class="form-control" id="addLocation" v-model="data.location">
      </div>
    </div>
    <div class="form-row mt-2">
      <div class="col">
        <label for="addReleaseDate" class="mr-2">Comment</label>
        <input type="text" class="form-control" id="addReleaseDate" v-model="data.comment">
      </div>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Add Publisher</button>
  </form>
</template>

<script>
import publisherService from '../services/PublisherService'
export default {
  name: "AddPublisher",
  props: {
    getPublishers: Function
  },
  data() {
    return {
      data: {
        name: null,
        comment: null,
        location: null
      },
      error: null,
      message: null
    }
  },
  methods: {
    async addPublisher() {
      this.error = null
      this.message = null
      let res = await publisherService.createPublisher(this.data)
      if(res.data.error) this.error = res.data.error
      if(res.data.message) this.message = res.data.message
      this.getPublishers()
    }
  }
}
</script>

<style scoped>

</style>
