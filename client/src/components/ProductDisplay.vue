<template>
  <q-scroll-area style="height: 800px; width: 100%">
    <div >
      
      <div class="col-12 col-sm-6 row justify-around" >
        <div v-for="(product, index) in products" :key="index" class="col-4">
          <q-img
            :src="product.image"
            style="width: 100%; height: 100vh"
          >
          </q-img>
          <q-card class="my-card bg-white text-black column items-center" flat  >
            <q-card-section style="text-align:center">
              <div class="text-h7">{{product.name}}</div>
              <div class="text-subtitle3">{{'IDR ' + product.price}}</div>
              <q-icon @click="addToCart(product._id)" name="shopping_cart" style="font-size: 2em;cursor:pointer"></q-icon>
            </q-card-section>
          </q-card> 
        </div>
      </div>
    </div>

  </q-scroll-area>
</template>

<script>
import { mapState } from 'vuex'
import Axios from 'axios';

export default {
  name: 'ProductDisplay',
  computed: {
    ...mapState ([
      'products'
    ])
  },
  methods: {
    addToCart(id) {
      if (!localStorage.getItem('tokenUser')) {
        this.$q.notify({message: "Please Sign In First", position: 'top'})
      } else {
        this.$store.dispatch('addToCart', id)
        this.$store.dispatch('fetchCart')
        this.$q.notify({icon: 'thumb_up', message: "You have successfully added a product to your cart", position: 'top'})
      }
    }
  }
}
</script>

