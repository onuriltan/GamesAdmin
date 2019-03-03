<template>
  <div class="container d-flex justify-content-center text-center aligh-items-center h-100 p-3 mx-auto flex-column mb-5" style="min-height: 80vh">

    <main role="main" class="inner cover">
      <h1 class="cover-heading">Welcome to your dashboard</h1>
      <p class="lead">Manage your dashboard by using the links in the navigation bar</p>

    </main>

  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  async mounted () {
    await this.$store.dispatch("checkIsAuthenticated")
  }
}
</script>

<style scoped>

</style>
