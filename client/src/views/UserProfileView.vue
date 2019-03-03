<template>
  <div class="container" style="margin-top: 50px">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#change-email" role="tab" aria-controls="change-email" aria-selected="true">Change Email</a>
        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#change-password" role="tab" aria-controls="nav-profile" aria-selected="false">Change Password</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active mt-5" id="change-email" role="tabpanel" aria-labelledby="nav-home-tab">
        <ChangeEmail/>
      </div>
      <div class="tab-pane fade mt-5" id="change-password" role="tabpanel" aria-labelledby="nav-profile-tab">
        <ChangePassword/>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePassword from '../components/ChangePassword'
import ChangeEmail from '../components/ChangeEmail'
export default {
  name: 'ProfileView',
  components: {
    ChangePassword,
    ChangeEmail
  }
}
</script>
