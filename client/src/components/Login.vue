<template>
  <div class="login mb-5">
    <div class="login-container container">
      <form class="login-container__form" @submit.prevent="login">
        <div class="alert alert-danger mb-3" v-if="error !== null">
          {{error}}
        </div>
        <h2 class="text-center pb-3">Login</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                 placeholder="Enter email" v-model="email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary login-container__form__button" :class="{ 'button--loading': loginClicked }">
          <i class="fa fa-refresh fa-spin hide--button--loading--icon" :class="{ 'show--button--loading--icon': loginClicked }"></i>
          <div style="margin: 0 5px;">
            Login
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      loginClicked: false,
      error: null
    }
  },
  methods: {
    async login () {
      this.loginClicked = true
      this.error = null
      setTimeout(async () => {
        const res = await this.$store.dispatch('login', { email: this.email, password: this.password })
        if (res.data.error) this.error = res.data.error
        this.loginClicked = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Login";
</style>
