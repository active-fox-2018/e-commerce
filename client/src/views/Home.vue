<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs2 v-for="(product, i) in products" :key="i">
        <router-link :to="{ name: 'details', params: { id: product._id }}">
          <Card :product="product"/>
        </router-link>

      </v-flex>

    </v-layout>

  </v-container>
</template>
<script>
import Card from '@/components/Card'
import api from '@/api/server.js'

export default {
  components: {
    Card
  },
  data () {
    return {
      products: []
    }
  },
  created() {
    this.getAllProducts()
  },
  methods: {
    getAllProducts() {
      api
        .get('/products')
        .then(({data}) => {
          this.products = data
        })
        .catch(err => {
          console.log(err);

        })
    },
  },

}
</script>
