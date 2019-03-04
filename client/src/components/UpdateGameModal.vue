<template>
  <div>
    <div class="modal fade" id="gameUpdateModal" data-keyboard="false" data-backdrop="static"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Game</h5>
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
                <label for="name" class="col-form-label">Name</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="name" v-model="data.name">
              </div>
              <div class="form-group">
                <label for="addReleaseDate" class="col-form-label">Release Date</label>
                <input type="date" class="form-control" id="addReleaseDate" v-model="data.dateReleased">
              </div>
              <div class="form-group">
                <label for="publishers">Publisher</label>
                <select class="form-control" id="publishers" v-model="data.publisherId">
                  <option v-for="pub in publishers" :value="pub._id">{{pub.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="consoles">Console</label>
                <select class="form-control" id="consoles" v-model="data.consoleId">
                  <option v-for="console in consoles" :value="console._id">{{console.name}}</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetItem">Close</button>
            <button type="button" class="btn btn-success" @click="updateItem(data)">Update</button>
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
      itemToUpdate: Object,
      resetItem: Function,
      updateItem: Function,
      publishers: Array,
      consoles: Array,
      updatedMessage: String,
      errorMessage: String
    },
    data () {
      return {
        data: {
          oldName: this.itemToUpdate.name,
          name: this.itemToUpdate.name,
          dateReleased: this.itemToUpdate.dateReleased,
          publisherId:this.itemToUpdate.publisherId,
          consoleId: this.itemToUpdate.consoleId
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
