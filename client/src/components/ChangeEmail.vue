<template>
  <div class="profile d-flex justify-content-center align-items-center flex-column">
    <h1>Change Email</h1>
    <p class="text-center mb-5">Use the form below to change your email.</p>
    <form @submit.prevent="changeEmail" style="width: 300px">
      <div class="alert alert-danger mb-3" v-if="error !== null">
        {{error}}
      </div>
      <div class="alert alert-success mb-3" v-if="message !== null">
        {{message}}
      </div>
      <input type="email" class="input-lg form-control mb-3" name="email" id="email"
             placeholder="New Email" autocomplete="off" v-model="data.newEmail">
      <input type="submit" class="col-xs-12 btn btn-primary btn-load" data-loading-text="Changing Password..."
             value="Change Email">
    </form>
  </div>
</template>

<script>
import userService from '../services/UserService'
export default {
  name: "ChangeEmail",
  data () {
    return {
      data: {
        newEmail: null,
      },
      error: null,
      message: null
    }
  },
  methods: {
    async changeEmail () {
      this.error = null
      this.message = null
      let res = await userService.updateEmail(this.data)
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

<style scoped>

</style>
