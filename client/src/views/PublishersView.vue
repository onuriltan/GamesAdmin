<template>
  <Items pageName="publishers"
         :isLoading="isLoading"
         :items="publishers"
         :getItems="getPublishers"
         :createItem="createPublisher"
         :deleteItem="deletePublisher"
  />
</template>

<script>
import Items from '../components/Items'
import PublishersService from '../services/PublishersService'

export default {
  name: 'PublishersView',
  components: {
    Items
  },
  data () {
    return {
      isLoading: false,
      publishers: []
    }
  },
  methods: {
    async getPublishers () {
      this.isLoading = true
      this.publishers = await PublishersService.getPublishers()
      this.isLoading = false
    },
    async createPublisher (publisherTitle) {
      this.isLoading = true
      await PublishersService.createPublisher(publisherTitle)
      await this.getPublishers()
      this.isLoading = false
    },
    async deletePublisher (publisherTitle) {
      this.isLoading = true
      await PublishersService.deletePublisher(publisherTitle)
      await this.getPublishers()
      this.isLoading = false
    }
  },
  beforeMount () {
    this.getPublishers()
  }
}
</script>
