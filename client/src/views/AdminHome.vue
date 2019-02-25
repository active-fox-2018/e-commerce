<template>
  <v-container>
    <router-view @new_product="new_product"></router-view>
    <v-btn class="text-xs-center" color="primary" @click="add">add product</v-btn>
    <v-layout>
      <v-flex xs-12>
        <v-card>
          <v-tabs v-model="active" color="grey lighten-1" slider-color="primary">
            <v-tab v-for="(tab, i) in tabs" :key="i" ripple>{{ tab }}</v-tab>

            <v-tab-item>
              <v-container grid-list-lg>
                <v-layout column>
                  <Product v-for="(product, i) in products" :key="i" :product="product" @delete_product="deleteProduct"/>

                </v-layout>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container grid-list-lg>
                <v-layout column>
                  <TransactionDetail v-for="(transaction, i) in pendings" :key="i" :transaction="transaction" :status="'admin'"/>

                </v-layout>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container grid-list-lg>
                <v-layout column>
                  <TransactionDetail v-for="(transaction, i) in recived" :key="i" :transaction="transaction" :status="'admin'"/>

                </v-layout>
              </v-container>
            </v-tab-item>

          </v-tabs>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api/server.js'
import TransactionDetail from '@/components/TransactionDetail'
import Product from '@/components/AdminProduct'

export default {
  components: {
    TransactionDetail,
    Product
  },
  data() {
    return {
      tabs: [
        'Products',
        'Sent items',
        'Done'
      ],
      active: null,
      products: [],
      transactions: [],
      pendings: [],
      recived: []
    }
  },
  mounted() {
    this.getAllProducts()
    this.getTransactions()
  },
  methods: {
    getAllProducts() {
      api
        .get('/products')
        .then(({data}) => {
          this.products = data.reverse()
        })
        .catch(err => {
          console.log(err);
        })
    },
    getTransactions() {
      api
        .get(`/transactions`, { headers: { token: localStorage.getItem('token') } })
        .then(({data}) => {
          this.transactions = data.reverse()
          this.getPending()
          this.getRecived()
        })
        .catch(err => {
          console.log(err);
        })
    },
    getPending() {
      this.pendings = this.transactions.filter(e => e.status === "pending")

    },
    getRecived() {
      this.recived = this.transactions.filter(e => e.status === "recived")
    },
    add() {
      this.$router.push({ name: 'addProduct' })
    },
    new_product(payload) {
      this.products.push(payload)
    },
    deleteProduct(payload) {
      let index = this.products.findIndex(e => e._id === payload._id)
      this.products.splice(index, 1)
    }
  },
};
</script>

<style>
</style>
