<template>
  <div class="profile d-flex justify-content-center align-items-center flex-column mt-5">
    <h1>Change Email</h1>
    <p class="text-center mb-5">Use the form below to change your email.</p>
    <form method="post" id="passwordForm" style="width: 400px">
      <input type="email" class="input-lg form-control mb-3" name="email" id="email"
             placeholder="New Email" autocomplete="off">

      <input type="submit" class="col-xs-12 btn btn-primary btn-load" data-loading-text="Changing Password..."
             value="Change Email">
    </form>
  </div>
</template>

<script>
export default {
    name: "ChangeEmail"
}
</script>

<style scoped>

</style>
