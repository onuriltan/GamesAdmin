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

      <div style="display: flex; flex-grow: 1">
        <ul class="navbar-nav mr-auto" style="display: contents">
          <li class="nav-item mr-2" v-if="isUser">
            <router-link class="nav-link" to="/games" >Games</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isUser">
            <router-link class="nav-link" to="/consoles" >Consoles</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isUser">
            <router-link class="nav-link" to="/publishers" >Publishers</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isAdmin">
            <router-link class="nav-link" to="/logs" >Logs</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isAdmin">
            <router-link class="nav-link" to="/users" >Users</router-link>
          </li>
        </ul>
      </div>
      <button v-if="isAuthenticated" class="btn btn-outline-dark my-2 my-sm-0" @click="logout()">Logout</button>

    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isAdmin () {
      return this.$store.state.AuthStore.role === 'admin'
    },
    isUser () {
      return this.$store.state.AuthStore.role === 'user'
    },
    isAuthenticated () {
      return this.$store.state.AuthStore.isAuthenticated === true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
