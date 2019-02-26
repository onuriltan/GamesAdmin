<template>
  <div class="login">
    <div class="login-container container">
      <form class="login-container__form" @submit.prevent="login">
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
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name:'Login',
  data () {
    return {
      email: '',
      password: '',
      loginClicked: false,
    }
  },
  methods : {
    async login () {
        this.loginClicked = true
        setTimeout(async () => {
          const res = await this.$store.dispatch('login', { email: this.email, password: this.password })
          this.loginClicked = false
        }, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Login";
</style>
