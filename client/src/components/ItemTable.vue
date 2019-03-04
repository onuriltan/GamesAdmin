<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">Item name</th>
        <th scope="col" v-if="!isUser">Added By</th>
        <th scope="col" v-if="group ==='game'">Publisher</th>
        <th scope="col" v-if="group ==='game'">Console</th>
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
      <tr v-for="item in items" v-if="items.length > 0">
        <td>{{item.name}}</td>
        <td v-if="!isUser && item.user">
          {{item.user.email}}
        </td>
        <td v-if="group ==='game' && item.publisher">{{item.publisher.name}}</td>
        <td v-if="group ==='game' && item.console">{{item.console.name}}</td>
        <td v-if="group ==='game'">{{item.dateReleased | readableDate}}</td>
        <td v-if="group ==='console'">{{item.cpu}}</td>
        <td v-if="group ==='console'">{{item.ram}}</td>
        <td v-if="group ==='console'">{{item.year}}</td>
        <td v-if="group ==='console'">{{item.comment}}</td>
        <td v-if="group ==='publisher'">{{item.location}}</td>
        <td v-if="group ==='publisher'">{{item.comment}}</td>
        <td>
          <button v-if="group==='game'" type="button" class="btn btn-success btn-sm mr-3"
                  @click="setItemtoUpdate(item)" data-toggle="modal" data-target="#gameUpdateModal">Update
          </button>
          <button v-if="group==='console'" type="button" class="btn btn-success btn-sm mr-3"
                  @click="setItemtoUpdate(item)" data-toggle="modal" data-target="#consoleUpdateModal">Update
          </button>
          <button v-if="group==='publisher'" type="button" class="btn btn-success btn-sm mr-3"
                  @click="setItemtoUpdate(item)" data-toggle="modal" data-target="#publisherUpdateModal">Update
          </button>

          <button type="button" class="btn btn-danger btn-sm" @click="deleteItemById(group,item._id)">Delete</button>
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
    group: String,
    isUser: Boolean,
    setItemtoUpdate: Function
  },
  filters: {
    readableDate(date) {
      if (date === null) {
        return ' '
      }
      let theDate = new Date(date)
      let month = theDate.getUTCMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      let day = theDate.getUTCDate()
      if (day < 10) {
        day = '0' + day
      }
      let year = theDate.getUTCFullYear()
      return day + '/' + month + '/' + year
    }
  }
}
</script>

<style scoped>

</style>
