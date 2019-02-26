<template>
  <Items pageName="consoles"
         :isLoading="isLoading"
         :items="consoles"
         :getItems="getConsoles"
         :createItem="createConsole"
         :deleteItem="deleteConsole"
  />
</template>

<script>
import ConsolesService from '../services/ConsolesService'
import Items from '../components/Items'
export default {
  name: "ConsolesView",
  components: {
    Items
  },
  data () {
    return {
      isLoading: false,
      consoles: []
    }
  },
  methods: {
    async getConsoles () {
      this.isLoading = true
      this.consoles = await ConsolesService.getConsoles()
      this.isLoading = false
    },
    async createConsole (consoleTitle) {
      this.isLoading = true
      await ConsolesService.createConsole(consoleTitle)
      await this.getConsoles()
      this.isLoading = false
    },
    async deleteConsole (consoleTitle) {
      this.isLoading = true
      await ConsolesService.deleteConsole(consoleTitle)
      await this.getConsoles()
      this.isLoading = false
    }
  },
  beforeMount() {
    this.getConsoles()
  }

}
</script>

<style scoped lang="scss">

</style>
