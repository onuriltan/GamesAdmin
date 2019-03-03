<template>
    <Login />
</template>

<script>
import Login from '../components/Login'
export default {
  components: {
    Login
  },
  async mounted () {
    await this.$store.dispatch("checkIsAuthenticated")
  }
}
</script>

<style lang="scss">

</style>
