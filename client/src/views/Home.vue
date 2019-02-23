<template>
  <div class="home">
    <router-view @delete-product="deleteProduct" :user="user"></router-view>
    <div class="card-columns" style="column-count: 4">
      <ProductCard v-for="product in products" :key="product._id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/productCard.vue'

export default {
  name: 'home',
  components: {
    ProductCard
  },
  props: ['products', 'user'],
  methods: {
    deleteProduct (id) {
      this.$emit('delete-product', id)
    }
  }
}
</script>
