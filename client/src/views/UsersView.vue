<template>
  <div class="items-list container mt-5 mb-5">
    <h1 class="text-center mb-5">List of Users</h1>
    <form @submit.prevent="addUser" class="form justify-content-center  mb-5">
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{error}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="form-row">
        <div class="col">
          <label for="email" class="mr-2">Email</label>
          <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
        </div>
        <div class="col">
          <label for="password" class="mr-2">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col">
          <label for="role">Role</label>
          <select class="form-control" id="role" v-model="role">
            <option value="user">User</option>
          </select>
        </div>
        <div class="col">
          <label for="comment" class="mr-2">Comment</label>
          <input type="text" class="form-control" id="comment" v-model="comment">
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Add User</button>
    </form>

    <UserTable :users="users" :deleteUser="deleteUser" :deactivateUser="deactivateUser" :setUser="setUser"/>

    <UpdateUserModal v-if="selectedUser" :user="selectedUser" :resetUser="resetUser"
                         :updateUser="updateUser" :updatedMessage="updatedMessage" :errorMessage="errorMessage"/>
  </div>
</template>

<script>
import UserService from '../services/UserService'
import UpdateUserModal from '../components/UpdateUserModal'
import UserTable from '../components/UserTable'
export default {
  name: 'UsersView',
  components: {
    UpdateUserModal,
    UserTable
  },
  data () {
    return {
      users: [],
      isLoading: false,
      email: null,
      password: null,
      role: null,
      comment: null,
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
      setTimeout(() => { this.selectedUser = null }, 300)
    },
    async getUsers () {
      this.isLoading = true
      this.users = await UserService.getUsers()
      this.isLoading = false
    },
    async updateUser (oldEmail, newEmail, newPassword, newRole, newComment) {
      this.isLoading = true
      this.error = null
      this.updatedMessage = null
      this.errorMessage = null
      let res = await UserService.updateUser(oldEmail, newEmail, newPassword, newRole, newComment)
      if (res.data.message) {
        this.updatedMessage = res.data.message
        $('#userInfoChaneModal').modal('toggle')
      }
      if (res.data.error) this.errorMessage = res.data.error
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
      let res = await UserService.addUser({ email: this.email, password: this.password, role: this.role, comment: this.comment })
      if (res.data.error) {
        this.error = res.data.error
      }
      await this.getUsers()
      this.isLoading = false
    }
  },
  async beforeMount () {
    await this.$store.dispatch("checkIsAuthenticated")
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Items";
</style>
