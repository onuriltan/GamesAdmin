<template>
  <div>
    <div class="modal fade" id="itemUpdateModal" data-keyboard="false" data-backdrop="static"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Item</h5>
            <button type="button" class="close" data-dismiss="modal" @click="resetItem" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="alert alert-danger" v-if="errorMessage">
                {{errorMessage}}
              </div>
              <div class="form-group">
                <label for="email" class="col-form-label">Name</label>
                <input v-if="user" type="email" class="form-control" id="email" v-model="newName">
              </div>
              <div class="form-group">
                <label for="password" class="col-form-label">Release Date</label>
                <input v-if="user" type="password" class="form-control" id="password" v-model="newReleaseDate">
              </div>
              <div class="form-group">
                <label for="role">Publisher</label>
                <select class="form-control" id="role" v-model="newPublisher">


                </select>
              </div>
              <div class="form-group">
                <label for="123" class="col-form-label">Console</label>
                <input v-if="user" type="text" class="form-control" id="123" v-model="newConsole">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetItem">Close</button>
            <button type="button" class="btn btn-success" @click="updateItem(user.email, newEmail, newPassword, newRole, newComment)">Update</button>
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
      item: Object,
      resetItem: Function,
      updateItem: Function,
      updatedMessage: String,
      errorMessage: String
    },
    data () {
      return {
        newName: this.game.name,
        newReleaseDate: this.game.releaseDate,
        newPublisher:this.game.publisher,
        newConsole: this.game.console
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
