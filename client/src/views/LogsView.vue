<template>
  <Logs />
</template>

<script>
import Logs from '../components/Logs'
export default {
  name: 'LogsView',
  components: {
    Logs
  },
  async beforeMount () {
    await this.$store.dispatch('checkIsAuthenticated')
  }
}
</script>
