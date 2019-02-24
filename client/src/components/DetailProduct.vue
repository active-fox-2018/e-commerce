<template>
  <div class="container" style="mt-4">
    <hr>
    <button @click="back()" class="buttonNav">Back</button>
    <div class="row">
      <div class="col">
        <img :src="details.img" style="width:300px;">
      </div>
      <div class="col">
        <div class="row">
          <h4 style="text-align:left">{{details.name}}</h4>
          <p class="category">{{details.category}}</p>
        </div>
        <div class="row">
          Rp. {{details.price}}
        </div>
        <div class="row">
          Stock: {{details.stock}}
        </div>
        <div class="row">
          <p>Buy</p>
        </div>
        <div class="row mb-2">
          <img @click="minStock()" src="../assets/left.png">
          <input v-model="qty" class="mr-2 ml-2" type="number" min="1" style="width:50px;text-align:center">
          <img @click="plusStock()" src="../assets/right.png">
        </div>
        <div class="row">
          <button @click="addToCart(details._id)" class="buttonNav">+ Add To Cart</button>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <h5>Description</h5>
        </div>
        <div class="row">
          {{details.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import relicApi from '@/api/index'
export default {
  data () {
    return {
      qty: 1,
      details: {}
    }
  },
  methods: {
    findProduct () {
      relicApi({
        url: `/products/${this.$route.params.id}`,
        method: 'get'
      })
        .then((result) => {
          this.details = result.data
          console.log(this.details, '===== IKI DETAILS')
        }).catch((err) => {
          console.log(err)
        })
    },
    addToCart (productId) {
      let data = {
        userId: localStorage.userId,
        productId: productId,
        qty: this.qty
      }
      this.$emit('add-cart', data)
    },
    minStock () {
      if (this.qty !== 0) {
        this.qty--
      }
    },
    plusStock () {
      if (this.qty < this.details.stock) {
        this.qty++
      }
    },
    back () {
      this.$emit('hide-details')
    }
  },
  computed: {
    price () {
      return this.details.price.toLocaleString()
    }
  },
  watch: {
    $route (to, from) {
      this.findProduct()
      this.qty = 0
    }
  },
  created () {
    this.findProduct()
  }
}
</script>

<style>

</style>
