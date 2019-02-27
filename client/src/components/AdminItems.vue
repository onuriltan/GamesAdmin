<template>
  <div class="items-container container">
    <h1 class="text-center mb-5">List of Items</h1>
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
        <form @submit.prevent="addItem('game', game)" class="form-inline mb-5 mt-5 align-items-end">
          <div class="form-group mr-3 mb-0">
            <label for="addgame" class="mr-2">Game Name</label>
            <input type="text" class="form-control" id="addgame" placeholder="Enter game" v-model="game">
          </div>
          <button type="submit" class="btn btn-primary">Add Game</button>
        </form>
        <ItemTable :items="games" :deleteItemById="deleteItemById" group="game"/>
      </div>
      <div class="tab-pane fade" id="console" role="tabpanel" aria-labelledby="profile-tab">
        <form @submit.prevent="addItem('console', console)" class="form-inline mb-5 mt-5 align-items-end">
          <div class="form-group mr-3 mb-0">
            <label for="addConsole" class="mr-2">Console Name</label>
            <input type="text" class="form-control" id="addConsole" placeholder="Enter console" v-model="console">
          </div>
          <button type="submit" class="btn btn-primary">Add Console</button>
        </form>
        <ItemTable :items="consoles" :deleteItemById="deleteItemById" group="console"/>
      </div>
      <div class="tab-pane fade" id="publisher" role="tabpanel" aria-labelledby="contact-tab">
        <form @submit.prevent="addItem('publisher', publisher)" class="form-inline mb-5 mt-5 align-items-end">
          <div class="form-group mr-3 mb-0">
            <label for="addPublisher" class="mr-2">Publisher Name</label>
            <input type="text" class="form-control" id="addPublisher" placeholder="Enter publisher" v-model="publisher">
          </div>
          <button type="submit" class="btn btn-primary">Add Publisher</button>
        </form>
        <ItemTable :items="publishers" :deleteItemById="deleteItemById" group="publisher"/>
      </div>
    </div>
  </div>

</template>

<script>
import ItemTable from './ItemTable'
export default {
  name: 'AdminItems',
  data () {
    return {
      game: '',
      console: '',
      publisher: ''
    }
  },
  components: {
    ItemTable
  },
  props: {
    games: Array,
    consoles: Array,
    publishers: Array,
    addItem: Function,
    deleteItemById: Function
  }
}

</script>
<style scoped lang="scss">
  .items-container {
    margin-top: 100px;
  }
</style>
