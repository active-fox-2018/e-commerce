<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs2 v-for="(product, i) in searched" :key="i">
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
      products: [],
      searched: []
    }
  },
  watch: {
    $route(to, from) {
      this.search()
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
          this.search()
        })
        .catch(err => {
          console.log(err);

        })
    },
    search() {
      this.searched = this.products.filter(product => product.name.toLowerCase().includes(this.$route.query.query || ''))
    }
  },

}
</script>
