<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <span v-if="status === 'admin'" class="title">User: {{transaction.userId.name}}</span>
      <v-layout row justify-space-between>
        <v-flex xs2>
          <v-img :src="transaction.products[0].productId.image" aspect-ratio="1"/>
        </v-flex>
        <v-flex xs3>
          <p class="title font-weight-regular">{{transaction.products[0].productId.name}}</p>
        </v-flex>
        <v-flex xs3>
          <p>status: {{transaction.status}}</p>
        </v-flex>
        <v-flex xs2>
          <p
            class="text-xs-right"
          >{{new Date(transaction.createdAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
        </v-flex>
        <v-flex xs2 v-if="status === 'pending'">
          <v-btn color="green" dark @click="recived">recived</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import api from '@/api/server.js'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

export default {
  props: ['transaction', 'status'],
  methods: {
    recived() {
      let obj = {
        status: 'recived',
        createdAt: new Date
      }
      api
        .put(`/transactions/${this.transaction._id}`, obj, { headers: { token: localStorage.getItem('token') } })
        .then(({data}) => {
          console.log(data);
          Toast.fire({
            type: 'success',
            title: 'Products recived'
          })
          this.$emit('recived')
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
};
</script>

<style>
</style>
