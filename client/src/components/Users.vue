<template>
  <div class="items-list container">
    <h1 class="text-center mb-5">List of Users</h1>
    <form @submit.prevent="addUser" class="form m-auto justify-content-center align-items-end" style="width: 300px; margin-bottom: 50px !important;">
      <div class="alert alert-danger mb-3" v-if="error !== null">
        {{error}}
      </div>
      <div class="form-group mr-3">
        <label for="exampleInputEmail1" class="mr-2">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group mr-3">
        <label for="exampleInputPassword1" class="mr-2">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <div class="form-group mr-3">
        <label for="role">Role</label>
        <select class="form-control" id="role" v-model="role">
ü          <option :value="{ role: 'user' }">User</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Add User</button>
    </form>

    <ul class="list-group items-list__view" v-for="(user,index) in users">
      <li class="list-group-item items-list__view__title" :class="{'bg-secondary' : !user.active}" :key="index">
        {{user.email}}
        <button class="btn btn-danger btn-sm" style="float: right" @click="deleteUser(user.email)" >Delete</button>
        <button class="btn btn-warning btn-sm mr-2" style="float: right" v-if="user.active" @click="deactivateUser(user.email)">Deactivate</button>
        <button class="btn btn-success btn-sm mr-2" style="float: right" v-if="user.active"
                @click="setUser(user)" data-toggle="modal" data-target="#userInfoChaneModal">Update</button>
      </li>
    </ul>
    <UserInfoChangeModal v-if="selectedUser" :user="selectedUser" :resetUser="resetUser"
                         :updateUser="updateUser" :updatedMessage="updatedMessage" :errorMessage="errorMessage"/>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import UserInfoChangeModal from '../components/UserInfoChangeModal'
export default {
  name: 'Users',
  components: {
    UserInfoChangeModal
  },
  data () {
    return {
      users: [],
      isLoading: false,
      email: null,
      password: null,
      role: null,
      updatedMessage: null,
      errorMessage: null,
      selectedUser: null,
      error: null
    }
  },
  methods: {
    setUser (selectedUser) {
      this.selectedUser = selectedUser
    },
    resetUser () {
      this.updatedMessage = null
      this.errorMessage = null
      setTimeout( () => {this.selectedUser = null}, 300);
    },
    async getUsers () {
      this.isLoading = true
      this.users = await UserService.getUsers()
      this.isLoading = false
    },
    async updateUser (oldEmail, newEmail, newPassword) {
      this.isLoading = true
      this.error = null
      this.updatedMessage = null
      this.errorMessage = null
      let res = await UserService.updateUser(oldEmail, newEmail, newPassword)
      if(res.data.message) this.updatedMessage = res.data.message
      if(res.data.error) this.errorMessage = res.data.error
      await this.getUsers()
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
      let res = await UserService.addUser({ email: this.email, password: this.password, role: this.role })
      if (res.error) {
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
