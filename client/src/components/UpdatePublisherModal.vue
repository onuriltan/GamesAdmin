<template>
  <div>
    <div class="modal fade" id="publisherUpdateModal" data-keyboard="false" data-backdrop="static"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Publisher</h5>
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
                <label for="cpu" class="col-form-label">Name</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="cpu" v-model="data.name">
              </div>
              <div class="form-group">
                <label for="ram" class="col-form-label">Location</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="ram" v-model="data.location">
              </div>
              <div class="form-group">
                <label for="year" class="col-form-label">Comment</label>
                <input v-if="itemToUpdate" type="text" class="form-control" id="year" v-model="data.comment">
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
  name: 'UpdatePublisherModal',
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
        location: this.itemToUpdate.location,
        comment: this.itemToUpdate.comment
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
