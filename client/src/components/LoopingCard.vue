<template>
  <div class="container showcase">
      <div class="row">
        <div v-for="(product, index) in products" :key="index" class="col-4">
          <div class="card mb-3" style="width: 350px; box-shadow: 2px 2px 2px grey">
            <p class="buttonCat" style=" width:350px;margin-bottom:0px;">{{product.category}}</p>
            <img :src="product.img" class="card-img-top" style="height: 400px; width:350px">
            <hr>
            <div class="card-body" style="width:350px;">
              <h5 class="card-title">{{product.name}}</h5>
              <div class="row">
                <div class="col">
                  <p>Rp. {{product.price.toLocaleString()}}</p>
                </div>
                <div class="col">
                  <p>Stock: {{product.stock}}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col">
                  <button @click="addToCart(product._id)" class="buttonNav ml-3">+ Add To Cart</button>
                </div>
                <div class="col">
                  <router-link :to="`/details/${product._id}`">
                    <button @click="showDetails()" class="buttonNav">Details</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    addToCart (productId) {
      let data = {
        userId: localStorage.userId,
        productId: productId,
        qty: 1
      }
      this.$emit('add-cart', data)
    },
    showDetails () {
      this.$emit('show-details')
    }
  }
}
</script>

<style>

</style>
