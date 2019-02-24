<template>
  <v-layout>
    <v-flex xs12 >
    <v-card color="white" class="black--text" v-if="$store.state.carts.length">
      <boxcart v-for="cart in $store.state.carts" :key="cart._id" :cart="cart" class="pa-2"/>
      <v-divider light></v-divider>
      <v-card-actions class="pa-3">
        TOTAL 
        <v-spacer></v-spacer>
        IDR {{getTotalPrice().toLocaleString()}}
      </v-card-actions>
      <v-btn
        color="white"
        light
        @click.stop="changeStatusToCheckout"
      >
        checkout
      </v-btn>
      <v-dialog 
        v-model="dialog"
        max-width="290"
      >
      <v-card>
        <boxcart v-for="cart in $store.state.carts" :key="cart._id" :cart="cart" class="pa-2" :checkoutStatus="checkoutStatus"/>
        <v-card-actions>

          TOTAL : IDR {{getTotalPrice().toLocaleString()}}
          <v-spacer></v-spacer>
          <v-btn        
            color="white"
            light @click.prevent="checkout"
          >Go Checkout
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-card>
    <v-card color="white" class="black--text mt-3" v-if="transactions">
      <v-container fluid >
     <v-card-title>Pending Transactions</v-card-title>
     <transactionbox v-for="transaction in transactions" :key="transaction._id" :transaction="transaction" class="mt-4" @changeStatusTransaction="getTransactionData"/>
      </v-container>
    </v-card>
  </v-flex>
  </v-layout>
</template>

<script>
import boxcart from '@/components/boxcart.vue'
import transactionbox from '@/components/transactionbox.vue'
import axios from 'axios'
export default {
  created() {
    this.getTransactionData()
  },
  data () {
    return {
      dialog: false,
      checkoutStatus: false,
      transactions: []
    }
  },
  components: {
    boxcart,
    transactionbox
  },
  methods: {
    getTotalPrice() {
      let totalPrice = 0
      this.$store.state.carts.forEach(cart => {
        totalPrice += (cart.quantity * cart.item.price)
      })
      return totalPrice
    },
    changeStatusToCheckout() {
      this.dialog = true
      this.checkoutStatus = true
    },
    checkout() {
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/checkout`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllCarts')
        this.dialog = false
        this.checkoutStatus = false
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTransactionData () {
      axios({
      method: 'get',
      url: `${this.$store.state.serverUrl}/transactions/user`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.transactions = data
      console.log(this.transactions)
    })
    .catch(err => {
      console.log(err)
    })
    }
  }
}
</script>

