<template>
  <div class="profile d-flex justify-content-center align-items-center flex-column ">
      <h1>Change Password</h1>
      <p class="text-center mb-5">Use the form below to change your password</p>
      <form method="post" id="passwordForm" style="width: 400px" class="mb-5">
        <input type="password" class="input-lg form-control mb-3" name="password1" id="oldPassword"
               placeholder="Old Password" autocomplete="off">
        <input type="password" class="input-lg form-control mb-3" name="password1" id="newPassword"
               placeholder="New Password" autocomplete="off">
        <input type="password" class="input-lg form-control mb-4" name="password2" id="newPasswordRepeat"
               placeholder="Repeat Password" autocomplete="off">
        <input type="submit" class="col-xs-12 btn btn-primary btn-load" data-loading-text="Changing Password..."
               value="Change Password">
      </form>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>

<style scoped lang="scss">

</style>
