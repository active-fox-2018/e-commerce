<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row justify-space-between>
        <v-flex xs2>
          <v-img :src="product.image" aspect-ratio="1"/>
        </v-flex>
        <v-flex xs3>
          <p class="font-weight-regular">{{product.name}}</p>
        </v-flex>
        <v-flex xs2>
          <p
            class="text-xs-right"
          >{{new Date(product.createdAt).toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
        </v-flex>
        <v-flex xs2>
          <router-link :to="{name: 'editProduct', params: { productId: product._id }}">
            <v-btn color="green" dark small>edit</v-btn>
          </router-link>
          <v-btn color="red" dark @click="deleteItem" small>delete</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import api from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
  props: ['product'],
  methods: {
    deleteItem() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          api
            .delete(`/products/${this.product._id}`, { headers: { token: localStorage.getItem('token') } })
            .then(({data}) => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.$emit('delete_product', data)
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
    }
  },
};
</script>

<style>
a {
  text-decoration: none;
}
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
