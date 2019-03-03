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
              <div class="alert alert-success" v-if="updatedMessage">
                {{updatedMessage}}
              </div>
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
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetUser">Close</button>
            <button type="button" class="btn btn-success" @click="updateUser(user.email, newEmail, newPassword)">Update</button>
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
      newPassword: ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
