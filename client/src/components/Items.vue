<template>
  <div class="items-list container">
    <h1 class="text-center mb-5">List of {{pageName}}</h1>
    <form class="input-group mb-5" @submit.prevent="createItem(newTitle)">
      <input type="text" class="form-control" :placeholder="'Create '+pageName+' ...'" v-model="newTitle">
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">OK</button>
      </div>
    </form>
    <ul class="list-group items-list__view" v-for="item in items">
      <li class="list-group-item items-list__view__title">
        {{item.title}}
        <button class="btn btn-danger" style="float: right" type="button" @click="deleteItem(item.title)">DELETE</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Games",
  data () {
    return {
      newTitle: ''
    }
  },
  props: {
    items: Array,
    pageName: String,
    isLoading: Boolean,
    deleteItem: Function,
    getItems:Function,
    createItem: Function,
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/components/Items";
</style>
