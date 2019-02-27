<template>
  <div class="items-container container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#game" role="tab" aria-controls="game" aria-selected="true">Games</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#console" role="tab" aria-controls="console" aria-selected="false">Consoles</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#publisher" role="tab" aria-controls="publisher" aria-selected="false">Publishers</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="game" role="tabpanel" aria-labelledby="game-tab">
        <ItemTable :items="games" :deleteItem="deleteItem" group="game"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <ItemTable :items="consoles" :deleteItem="deleteItem" group="console"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <ItemTable :items="publishers" :deleteItem="deleteItem" group="publisher"/>
      </div>
    </div>
  </div>

</template>

<script>
import ItemTable from './ItemTable'
export default {
  name: "AdminItems",
  components: {
    ItemTable
  },
  props: {
    games: Array,
    consoles: Array,
    publishers: Array,
    deleteItem: Function
  }
}

</script>
<style scoped lang="scss">
  .items-container {
    margin-top: 100px;
  }
</style>
