<template>
  <v-layout>
    <v-flex xs4>
      <v-img
        :src="cart.item.image"
        contain
      ></v-img>
    </v-flex>
    <v-flex xs7>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{cart.item.name}}</div>
          <div v-if="!checkoutStatus">IDR {{cart.item.price.toLocaleString()}}</div>
          <div v-if="checkoutStatus">IDR {{cart.item.price.toLocaleString()}} X {{cart.quantity}}</div>
          <v-overflow-btn 
            v-if="!checkoutStatus"
            :items="generateStock(cart.item.stock)"
            editable
            v-model="quantity"
          ></v-overflow-btn>
          <v-btn  v-if="!checkoutStatus" @click.prevent="addCart(cart.item._id)">Update</v-btn>
          <v-btn v-if="!checkoutStatus">Delete</v-btn>
        </div>
      </v-card-title>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
      <v-btn
        color="pink"
        flat
        @click.prevent="deleteCart"
      >
        delete
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  name: 'boxcart',
  data() {
    return {
      quantity: this.cart.quantity,
      quantityList: [],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      text: ''
    }
  },
  props: ['cart', 'checkoutStatus'],
  methods: {
    addCart(id) {
      if(this.quantity !== 0) {
        axios({
          method: 'post',
          url: `${this.$store.state.serverUrl}/addToCart`,
          headers: {
            token: localStorage.getItem('token')
          }, 
          data: {
            item : id,
            quantity : this.quantity
          }
        })
        .then(({data}) => {
          this.$store.dispatch('getAllCarts')

        })
        .catch(err => {
          console.log(err)
        })
      } else if(this.quantity === 0) {
        this.snackbar = true
        this.text = 'Do you want to delete it?'
      } 
    },
    generateStock(stock) {
      let items = []
      for(let i = 0; i <= this.cart.item.stock; i++) {
        items.push({
          text: i
        })
      }
      return items
    },
    deleteCart(cartId) {
      axios({
        method: 'delete',
        url: `${this.$store.state.serverUrl}/removeCart/${this.cart._id}`,
        headers: {
          token: localStorage.getItem('token'),
          data: {
            item: this.cart.item._id
          }
        }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllCarts')
        this.snackbar = false
      })
      .catch(err => {
        this.snackbar = false
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
