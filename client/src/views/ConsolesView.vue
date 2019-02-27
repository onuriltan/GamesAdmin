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
import ConsoleService from '../services/ConsoleService'
import Items from '../components/Items'
export default {
  name: 'ConsolesView',
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
      this.consoles = await ConsoleService.getConsoles()
      this.isLoading = false
    },
    async createConsole (consoleTitle) {
      this.isLoading = true
      await ConsoleService.createConsole(consoleTitle)
      await this.getConsoles()
      this.isLoading = false
    },
    async deleteConsole (consoleTitle) {
      this.isLoading = true
      await ConsoleService.deleteConsole(consoleTitle)
      await this.getConsoles()
      this.isLoading = false
    }
  },
  beforeMount () {
    this.getConsoles()
  }

}
</script>

<style scoped lang="scss">

</style>
