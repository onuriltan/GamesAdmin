<template>
  <div class="items-list container">
    <h1 class="text-center mb-5">List of users</h1>
    <form @submit.prevent="addUser" class="form-inline mb-5">
      <div class="form-group mr-3">
        <label for="exampleInputEmail1" class="mr-2">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group mr-3">
        <label for="exampleInputPassword1" class="mr-2">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>
    <div class="alert alert-danger" v-if="error !== null">
      {{error}}
    </div>

    <ul class="list-group items-list__view" v-for="(user,index) in users">
      <li class="list-group-item items-list__view__title" :class="{'bg-secondary' : !user.active}" :key="index">
        {{user.email}}
        <button class="btn btn-danger" style="float: right" @click="deleteUser(user.email)" >Delete</button>
        <button class="btn btn-warning mr-2" style="float: right" v-if="user.active" @click="deactivateUser(user.email)">Deactivate</button>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from '../services/UserService'
export default {
  name: 'Users',
  data () {
    return {
      users: [],
      isLoading: false,
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async getUsers () {
      this.isLoading = true
      this.users = await UserService.getUsers()
      this.isLoading = false
    },
    async deleteUser (email) {
      this.isLoading = true
      this.error = null
      await UserService.deleteUser(email)
      await this.getUsers()
      this.isLoading = false
    },
    async deactivateUser (email) {
      this.isLoading = true
      this.error = null
      await UserService.deactivateUser(email)
      await this.getUsers()
      this.isLoading = false
    },
    async addUser () {
      this.isLoading = true
      this.error = null
      let res = await UserService.addUser({ email: this.email, password: this.password})
      if(res.error) {
        this.error = res.error
      }
      await this.getUsers()
      this.isLoading = false
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Items";
</style>
