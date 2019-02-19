<template>
  <div class="home">
    <h1>HOME</h1>
    <banner/>
    <product/>

  </div>
</template>

<script>

import banner from '@/components/banner.vue'
import product from '@/components/product.vue'
export default {
  name: 'home',
  components: {
    banner,
    product
  }
}
</script>
