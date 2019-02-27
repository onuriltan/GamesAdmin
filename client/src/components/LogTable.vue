<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">Log</th>
        <th scope="col">User</th>
        <th scope="col">Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="log in logs">
        <td>{{log.title}}</td>
        <td>{{log.email}}</td>
        <td>{{log.createdAt | convertDate()}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LogTable",
  props: {
    logs : Array
  },
  filters: {
    convertDate: function (date) {
      let theDate = new Date(date)
      return `${theDate.getDate()}/${theDate.getMonth() + 1}/${theDate.getFullYear()}
      ${theDate.getHours()}:${theDate.getMinutes()}:${theDate.getSeconds()}`
    }
  }
}
</script>

<style scoped>

</style>
