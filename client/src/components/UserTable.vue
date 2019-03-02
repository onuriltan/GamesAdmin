<template>
  <div class="table-responsive mt-5">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">User</th>
        <th scope="col">Role</th>
        <th scope="col">Comment</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users">
        <td>{{user.email}}</td>
        <td>{{user.role}}</td>
        <td>{{user.comment}}</td>
        <td class="d-flex align-items-center justify-content-center">
          <button class="btn btn-danger btn-sm  mr-2" style="float: right" @click="deleteUser(user.email)" >Delete</button>
          <button class="btn btn-warning btn-sm mr-2" style="float: right" v-if="user.active" @click="deactivateUser(user.email)">Deactivate</button>
          <button class="btn btn-success btn-sm mr-2" style="float: right" v-if="user.active"
                  @click="setUser(user)" data-toggle="modal" data-target="#userInfoChaneModal">Update</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    users: Array,
    deleteUser: Function,
    deactivateUser: Function,
    setUser: Function
  }
}
</script>

<style scoped>

</style>
