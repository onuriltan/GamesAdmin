<template>
  <div class="table-responsive mt-5">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">Path</th>
        <th scope="col">User</th>
        <th scope="col">Last Time</th>
        <th scope="col">Count</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="log in logs">
        <td>{{log.path}}</td>
        <td>{{log.email}}</td>
        <td>{{log.updatedAt | convertDate()}}</td>
        <td>{{log.count}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LogTable',
  props: {
    logs: Array
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
