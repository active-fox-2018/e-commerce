<template>
  <div class="container">
    <div class="row">
      <form class="form-inline mb-3 active-pink-4">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input
          class="form-control form-control-sm ml-3 w-75"
          type="text"
          placeholder="Search"
          aria-label="Search"
        >
      </form>
      <product/>
    </div>
  </div>
</template>

<script>
import product from '@/components/product.vue'
export default {
  name: 'products',
  components: {
    product
  }
}
</script>

<style>
</style>
