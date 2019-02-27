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
import PublisherService from '../services/PublisherService'

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
      this.publishers = await PublisherService.getPublishers()
      this.isLoading = false
    },
    async createPublisher (publisherTitle) {
      this.isLoading = true
      await PublisherService.createPublisher(publisherTitle)
      await this.getPublishers()
      this.isLoading = false
    },
    async deletePublisher (publisherTitle) {
      this.isLoading = true
      await PublisherService.deletePublisher(publisherTitle)
      await this.getPublishers()
      this.isLoading = false
    }
  },
  beforeMount () {
    this.getPublishers()
  }
}
</script>
