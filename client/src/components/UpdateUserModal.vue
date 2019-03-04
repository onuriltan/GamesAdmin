<template>
  <div>
    <div class="modal fade" id="userInfoChaneModal" data-keyboard="false" data-backdrop="static"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
            <button type="button" class="close" data-dismiss="modal" @click="resetUser" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="alert alert-danger" v-if="errorMessage">
                {{errorMessage}}
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Email:</label>
                <input v-if="user" type="email" class="form-control" id="email" v-model="newEmail">
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Password:</label>
                <input v-if="user" type="password" class="form-control" id="password" v-model="newPassword">
              </div>
              <div class="form-group">
                <label for="role">Role</label>
                <select class="form-control" id="role" v-model="newRole">
                  <option value="user">User</option>
                </select>
              </div>
              <div class="form-group">
                <label for="123" class="col-form-label">Comment:</label>
                <input v-if="user" type="text" class="form-control" id="123" v-model="newComment">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetUser">Close</button>
            <button type="button" class="btn btn-success" @click="updateUser(user.email, newEmail, newPassword, newRole, newComment)">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoChangeModal',
  props: {
    user: Object,
    resetUser: Function,
    updateUser: Function,
    updatedMessage: String,
    errorMessage: String
  },
  data () {
    return {
      newEmail: this.user.email,
      newPassword: '',
      newRole: this.user.role,
      newComment: this.user.comment
    }
  }
}
</script>

<style scoped lang="scss">

</style>
