<template>
  <div class="profile d-flex justify-content-center align-items-center flex-column ">
      <h1>Change Password</h1>
      <p class="text-center mb-5">Use the form below to change your password</p>
      <form @submit.prevent="chagePassword" style="width: 400px" class="mb-5">
        <div class="alert alert-danger mb-3" v-if="error !== null">
          {{error}}
        </div>
        <div class="alert alert-success mb-3" v-if="message !== null">
          {{message}}
        </div>
        <input type="password" class="input-lg form-control mb-3" name="password1" id="oldPassword"
               placeholder="Old Password" autocomplete="off">
        <input type="password" class="input-lg form-control mb-3" name="password1" id="newPassword"
               placeholder="New Password" autocomplete="off" v-model="newPassword">
        <input type="password" class="input-lg form-control mb-4" name="password2" id="newPasswordRepeat"
               placeholder="Repeat Password" autocomplete="off">
        <input type="submit" class="col-xs-12 btn btn-primary btn-load" data-loading-text="Changing Password..."
               value="Change Password">
      </form>
  </div>
</template>

<script>
  import userService from '../services/UserService'
  export default {
    name: "ChangePassword",
    data () {
      return {
        oldPassword: null,
        newPassword: null,
        error: null,
        message: null
      }
    },
    methods: {
      async chagePassword () {
        let res = await userService.updateUser(null, null, this.newPassword)
        if(res.data.error) {
          this.error = res.data.error
        }
        if(res.data.message) {
          this.message = res.data.message
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
