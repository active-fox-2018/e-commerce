<template>
  <div class="home">
    <Showcase
        :products="products"
        :details="details"
        :isSearch="isSearch"
        @add-cart="addCart"
        @show-details="showDetails"></Showcase>
    <router-view
        v-if="details"
        @hide-details="hideDetails"
        @add-cart="addCart"/>
  </div>
</template>

<script>
import Showcase from '@/components/Showcase.vue'

export default {
  name: 'home',
  components: {
    Showcase
  },
  data () {
    return {
      details: false
    }
  },
  props: ['products', 'productsCopy', 'isSearch'],
  methods: {
    addCart (payload) {
      this.$emit('add-cart', payload)
    },
    showDetails () {
      this.details = true
    },
    hideDetails () {
      this.details = false
    }
  }
}
</script>
