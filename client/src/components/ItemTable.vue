<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">Item name</th>
        <th scope="col">Added By</th>
        <th scope="col" v-if="group ==='game'">Publisher</th>
        <th scope="col" v-if="group ==='game'">Release Date</th>
        <th scope="col" v-if="group ==='console'">CPU</th>
        <th scope="col" v-if="group ==='console'">RAM</th>
        <th scope="col" v-if="group ==='console'">Year</th>
        <th scope="col" v-if="group ==='console'">Comment</th>
        <th scope="col" v-if="group ==='publisher'">Location</th>
        <th scope="col" v-if="group ==='publisher'">Comment</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items">
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td v-for="publisher in publishers" v-if="group ==='game' && publisher._id === item.publisherId">
            {{publisher.name}}
        </td>
        <td v-if="group ==='game'">{{item.dateReleased}}</td>
        <td v-if="group ==='console'">{{item.cpu}}</td>
        <td v-if="group ==='console'">{{item.ram}}</td>
        <td v-if="group ==='console'">{{item.year}}</td>
        <td v-if="group ==='console'">{{item.comment}}</td>
        <td v-if="group ==='publisher'">{{item.location}}</td>
        <td v-if="group ==='publisher'">{{item.comment}}</td>
        <td>
          <button type="button" class="btn btn-danger" @click="deleteItemById(group,item._id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ItemTable',
  props: {
    items: Array,
    deleteItemById: Function,
    publishers: Array,
    group: String
  },
  data () {
    return {
      publisher: null
    }
  },
  methods: {
    async getPublisher(id) {
      this.publisher = await this.getPublisherById(id)
    }
  },
  watch: {
    group: function(newVal, oldVal) { // watch it
      if(newVal==='game') {

      }
    }
  }
}
</script>

<style scoped>

</style>
