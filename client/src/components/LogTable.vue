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
    convertDate(date) {
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

      let hours = theDate.getHours()
      if (hours < 10) {
        hours = '0' + hours
      }

      let minuntes = theDate.getMinutes()
      if (minuntes < 10) {
        minuntes = '0' + minuntes
      }

      let seconds = theDate.getSeconds()
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return day + '/' + month + '/' + year + ' '+ hours + ':' + minuntes + ':' + seconds
    }
  }
}
</script>

<style scoped>

</style>
