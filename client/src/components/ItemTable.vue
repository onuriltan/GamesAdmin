<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">Item name</th>
        <th scope="col">Added By</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items">
        <td>{{item.title}}</td>
        <td>{{item.email}}</td>
        <td>
          <button type="button" class="btn btn-danger" @click="deleteItemById(group,item._id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ItemTable',
  props: {
    items: Array,
    deleteItemById: Function,
    group: String
  }
}
</script>

<style scoped>

</style>
