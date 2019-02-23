<template>
  <div id="app">
    <div id="nav">
      <myNav @search="search" :user="user" @logout="logout"/>
    </div>
    <router-view @checkout="getAllProducts" @delete-product="deleteProduct" @edit-product="editProduct" :products="allProduct" @new-product="newProduct" :user="user" @set-user="setUser"/>
  </div>
</template>

<script>
import myNav from '@/components/nav.vue'
import server from '@/server/local.js'
import alertify from 'alertifyjs'

export default {
  name: 'app',
  components: {
    myNav
  },
  data () {
    return {
      user: null,
      allProduct: []
    }
  },
  methods: {
    getUser () {
      server({
        method: 'get',
        url: `/users/me`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch(err => {
          if (err.response.data) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    logout () {
      localStorage.removeItem('token')
      this.user = null
      this.$router.push({ name: 'home' })
    },
    setUser (user) {
      this.user = user
    },
    newProduct (product) {
      this.allProduct.unshift(product)
    },
    getAllProducts () {
      server({
        method: 'get',
        url: `/products`
      })
        .then(({ data }) => {
          this.allProduct = data
        })
        .catch(err => {
          if (err.response.data) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    editProduct (data) {
      let index = this.allProduct.findIndex(el => {
        return String(el._id) === String(data._id)
      })
      this.allProduct.splice(index, 1)
      this.allProduct.unshift(data)
    },
    search (query) {
      let q = new RegExp(query.toLowerCase())

      if (query) {
        this.allProduct = this.allProduct.filter(function (el) {
          return el.name.toLowerCase().match(q)
        })
      } else {
        this.getAllProducts()
      }
    },
    deleteProduct (id) {
      let index = this.allProduct.findIndex(el => {
        return String(el._id) === String(id)
      })
      this.allProduct.splice(index, 1)
    }
  },
  created () {
    this.getAllProducts()
    if (localStorage.token) {
      this.getUser()
    } else {
      this.user = null
    }
  }
}
</script>

<style>
#app {
  font-family: 'Karla', sans-serif ;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}

</style>
