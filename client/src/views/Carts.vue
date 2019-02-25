<template>
    <v-container>
    <v-layout row justify-space-between>
      <v-flex xs7>
        <Card v-for="(product, i) in carts.products" :key="i" :product="product" @add="add" @reduce="reduce"/>
      </v-flex>

      <v-flex xs4>
        <v-card>
          <v-container grid-list-lg>
            <v-layout column>
              <v-flex px-0>
                <span my-1 class="headline font-weight-medium">
                  Summary
                </span>
              </v-flex><hr><br>

              <v-flex >
                <v-layout justify-space-between>
                  <span>
                    Total Price:
                  </span>
                  <span>
                    IDR. {{totalPrice.toLocaleString()}}
                  </span>
                </v-layout>
              </v-flex><br><hr>

              <v-flex>
                <v-btn block small color="red" dark @click="checkout">
                  checkout
                </v-btn>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from '@/components/CardInCart'
import api from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
  components: {
    Card
  },
  data() {
    return {
      carts: {},
      totalPrice: 0
    }
  },
  created() {
    this.getCart()
  },
  methods: {
    getCart() {
      if (localStorage.getItem('token')) {
        api
          .get('/carts', {headers: {token: localStorage.getItem('token')}})
          .then(({data}) => {
            this.carts = data
            this.getTotalPrice()
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: "Please login first"
        })
      }
    },
    getTotalPrice() {
      let result = 0
      this.carts.products.forEach(e => {
        result += (e.productId.price * e.qty)
      });
      this.totalPrice = result
    },
    add(payload) {
      this.totalPrice += payload
    },
    reduce(payload) {
      this.totalPrice -= payload
    },
    checkout() {
      api
        .put(`/carts/checkout`, {total: this.totalPrice}, {headers: { token: localStorage.getItem('token') }})
        .then(({data}) => {
          console.log(data);
          this.carts = {}
        })
        .catch(err => {
          console.log(err);
        })

    }
  },
}
</script>

<style>

</style>
