<template>
  <div class="header-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <router-link class="navbar-brand ml-4" to="/">
        <img src="../assets/console-white.png" width="35" height="35" class="d-inline-block align-top mr-2"
             alt="console">
        GamesAdmin
        </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/games" v-if="isUser">Games</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/consoles" v-if="isUser">Consoles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/publishers" v-if="isUser">Publishers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logs" v-if="isAdmin">Logs</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users" v-if="isAdmin">Users</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isAdmin() {
      return this.$store.state.AuthStore.role === "admin"
    },
    isUser() {
      return this.$store.state.AuthStore.role === "user"
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
