<template>
  <v-flex pa-1 md7 lg3 xs12 >
  <v-card
    light
    color="white"
  >
  <v-img
    class="white--text"
    height="200px"
    :src="item.image"
  />
  <v-card-title>
    <div>
    <span class="black--text">{{item.name}}</span><br>
    <br>
    <span> IDR {{item.price.toLocaleString()}}</span>
    </div>
  </v-card-title>
  <v-card-actions class="justify-center" >
      <v-btn v-if="$store.state.type ==='admin'" flat color="orange">Edit</v-btn>
    <v-btn flat color="orange" @click.prevent="addCart(item._id)">+ Cart</v-btn>
      <v-overflow-btn
      :items="generateStock(item.stock)"
      editable
      v-model="quantity"
      ></v-overflow-btn>
  </v-card-actions>
  </v-card>
  </v-flex>
</template>

<script>
import axios from 'axios'
export default {
  name: 'boxItem',
  props: ['item'],
  data() {
    return  {
      quantity: 'select',
      quantityList: [],
    }
  },
methods: {
    addCart(id) {
      if(this.$store.state.login && this.quantity !== 0 && this.quantity !== 'select') {
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
          console.log(data)
          this.$store.dispatch('getAllCarts')

        })
        .catch(err => {
          console.log(err)
        })
      } else if(this.quantity === 0 || this.quantity === 'select') {
        this.$emit('wakeSnackbar', 'Please select the quantity first')
      } else {
        this.$emit('wakeSnackbar', '<- Please Sign in first')
        console.log('belum login')
      }
    },
    generateStock(stock) {
      let items = []
      for(let i = 0; i <= stock; i++) {
        items.push({
          text: i
        })
      }
      return items
    }
  }
}
</script>
