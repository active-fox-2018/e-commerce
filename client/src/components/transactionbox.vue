<template>
  <v-card>
    <v-container>
    <v-layout row wrap>
    <v-flex xs4 v-for="cart in transaction.CartId" :key="cart._id" class="mt-2">
      <v-img 
        :src="cart.item.image"
        height="200px"
        contain
      ></v-img>
    </v-flex>
    </v-layout>
    <v-card-title primary-title>
        <div>
          <div class="headline">IDR {{transaction.totalPrice.toLocaleString()}}</div>
          <div>Checkout Date : {{new Date(transaction.created_at).toDateString()}}</div>
          <div>Status : {{transaction.status.toUpperCase()}}</div>
          <v-btn v-if="transaction.status === 'incomplete'" @click.prevent="changeStatusTransaction('paid')">Paid</v-btn>
          <v-btn v-if="transaction.status === 'paid'" @click.prevent="changeStatusTransaction('confirmed')">Confirm</v-btn>
        </div>
      </v-card-title>

    <v-flex xs7>
    </v-flex>
    </v-container>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'transactionbox',
  props: ['transaction'],
  methods: {
    changeStatusTransaction(action) {
      axios({
        method: 'patch',
        url: `${this.$store.state.serverUrl}/transaction/${this.transaction._id}/${action}`,
        headers: {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$emit('changeStatusTransaction')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
