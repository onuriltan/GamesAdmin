<template>
  <div>
    <div class="modal fade" id="consoleUpdateModal" data-keyboard="false" data-backdrop="static"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Console</h5>
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
                <label for="cpu" class="col-form-label">CPU</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="cpu" v-model="data.cpu">
              </div>
              <div class="form-group">
                <label for="ram" class="col-form-label">RAM</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="ram" v-model="data.ram">
              </div>
              <div class="form-group">
                <label for="year" class="col-form-label">Year</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="year" v-model="data.year">
              </div>
              <div class="form-group">
                <label for="comment" class="col-form-label">Comment</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="comment" v-model="data.comment">
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
  name: 'UpdateConsoleModal',
  props: {
    itemToUpdate: Object,
    resetItem: Function,
    updateItem: Function,
    updatedMessage: String,
    errorMessage: String
  },
  data () {
    return {
      data: {
        oldName: this.itemToUpdate.name,
        name: this.itemToUpdate.name,
        cpu: this.itemToUpdate.cpu,
        ram: this.itemToUpdate.ram,
        year: this.itemToUpdate.year,
        comment: this.itemToUpdate.comment
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
