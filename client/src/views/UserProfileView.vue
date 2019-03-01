<template>
  <div class="container" style="margin-top: 100px">
    <ChangePassword/>
    <hr>
    <ChangeEmail/>
  </div>
</template>

<script>
import ChangePassword from '../components/ChangePassword'
import ChangeEmail from '../components/ChangeEmail'
export default {
  name: "ProfileView",
  components: {
    ChangePassword,
    ChangeEmail
  }
}
</script>
