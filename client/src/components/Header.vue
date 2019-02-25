<template>
  <div class="header-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand ml-4" href="#">
        <img src="../assets/console-white.png"  width="35" height="35" class="d-inline-block align-top mr-2" alt="console">
        GamesAdmin
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
