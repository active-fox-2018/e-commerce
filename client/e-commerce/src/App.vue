<template>
  <div id="app">
    <router-view :AllProducts="allProducts" />
  </div>
</template>

<script>
  import axios from '@/api/server.js'

  export default {
    created() {
      this.getAllProducts()
    },
    data() {
      return {
        allProducts: []
      }
    },
    methods: {
      getAllProducts() {
        axios.get('/products')
        .then(({data}) => {
            this.allProducts = data.products
            // this.$router.push({
            //     name: 'allProducts',
            //     params: {
            //         products: this.allProducts
            //     }
            // })
        })
        .catch(err => {
            console.log(err)
        })
      }
    }
  }
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
