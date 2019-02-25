<template>
  <div class="q-pa-md" >
    <div v-if="this.$store.state.cartUser.length > 0">
      <q-list style="margin-top:5%" bordered padding>
        <q-item v-for="(product, index) in this.$store.state.cartUser" :key="index">
          <q-item-section style="margin-left:5px" top thumbnail class="q-ml-none">
            <img :src="product.image" style="height:220px; width:200px">
          </q-item-section>

          <q-item-section>
            <h6>{{product.name}}</h6>
            <h7 caption>{{product.description}}</h7>
          </q-item-section>

          <q-item-section side >
            <h7 class="text-black bold">IDR {{product.price}}</h7>
          </q-item-section>
        </q-item>
      </q-list>
      <q-card>
        <q-card-actions align="around">
          <h6 class="content-start">Total</h6>
          <h5></h5>
          <h6>IDR {{getTotal}}</h6>
        </q-card-actions>
        <q-btn :loading="processCheckout" color="white" class="text-black" style="border-radius: 15px; " @click="checkout">
          Check Out
        </q-btn>
      </q-card>
    </div>
    <div v-else>
      <h4 style="margin-top:5%">Your Shopping Cart is Empty</h4>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data() {
    return {
      processCheckout: false
    }
  },
  created() {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    getTotal() {
      let total = 0
      this.$store.state.cartUser.forEach(product => {
        total += product.price
      });
      return total
    }
  },
  methods: {
    checkout () {
      this.$store.dispatch('newTransaction')
      this.$q.notify({icon: 'thumb_up', message: "Thank you for Shopping with us, Your transaction now is being processed", position: 'top-right'})
    }
  }
}
</script>

<style>

</style>
