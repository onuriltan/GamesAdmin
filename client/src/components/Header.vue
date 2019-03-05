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
        <ul class="navbar-nav" style="min-width: 100%; justify-content: flex-end !important;">
          <li class="nav-item mr-2" v-if="isAdmin">
            <router-link class="nav-link" to="/logs" data-toggle="collapse" data-target=".navbar-collapse.show">Logs</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isAdmin">
            <router-link class="nav-link" to="/users" data-toggle="collapse" data-target=".navbar-collapse.show">Users</router-link>
          </li>
          <li class="nav-item mr-2" v-if="isAuthenticated">
            <router-link class="nav-link" to="/items" data-toggle="collapse" data-target=".navbar-collapse.show">Items</router-link>
          </li>
          <li class="nav-item dropdown" style="float: right" v-if="isAuthenticated">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/userprofile" v-if="isUser" data-toggle="collapse" data-target=".navbar-collapse.show">Profile</router-link>
              <div class="dropdown-divider" v-if="isUser"></div>
              <div class="dropdown-item" style="cursor:pointer;" @click="logout()">
                Logout
              </div>
            </div>
          </li>
        </ul>

      </div>
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
