<template>
<div @click.prevent="detail" class="click-able  my-card card">
    <img class="product-img" :src="product.image" alt="product image">
    <div class="row ml-2">
        <h4>
            {{ product.name }}
        </h4>
    </div>
    <hr style="padding: 0.2rem; margin: 0.2rem">
    <div class="row ml-2 mb-4">
        {{ product.description }}
    </div>
    <div class="row ml-2 text-right">
        <h5 class="col mr-1 mb-2">
            IDR {{ product.price.toLocaleString() }}
        </h5>
    </div>
</div>
</template>

<script>
export default {
  name: 'productCard',
  props: ['product'],
  methods: {
    detail () {
      this.$router.push({ name: 'product', params: { id: this.product._id } })
    }
  }
}
</script>

<style>

</style>
