<template>
  <div id="app">
    <div>
      <h1>RELICS</h1>
    </div>
    <Navbar
      @login-user="loginUser"
      @log-out="logOut"
      @search-product="searchProduct"
      :isLogin="isLogin"
      :isAdmin="isAdmin"
      :isBuyer="isBuyer"
      :carts="carts">
    </Navbar>

    <div class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
    </div>

    <router-view
      @push-product="pushProduct"
      @delete-product="deleteProduct"
      @update-product="updateProduct"
      @update-cart="updateCart"
      @add-cart="addCart"
      @remove-cart-item="removeCartItem"
      @empty-cart="emptyCart"
      :products="products"
      :productsCopy="productsCopy"
      :carts="carts"
      :searcedProducts="searcedProducts"
      style="min-height:80vh"
    />

      <footer>
        <div class="container">
          <h1>ECOMMERCE</h1>
        </div>
      </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import relicApi from '@/api/index'
import alertify from 'alertifyjs'
import { log } from 'util'
import { triggerAsyncId } from 'async_hooks';

export default {
  name: 'home',
  data () {
    return {
      products: [],
      productsCopy: [],
      carts: [],
      isLogin: false,
      isAdmin: false,
      isBuyer: false,
      searcedProducts: []
    }
  },
  components: {
    Navbar
  },
  methods: {
    loginUser (payload) {
      relicApi({
        url: `/login`,
        method: 'post',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.id)
          localStorage.setItem('role', data.role)
          if(data.role == 'admin') {
            this.isLogin = true
            this.isAdmin = true
            this.$router.push('/transaction')
          } else if (data.role == 'buyer') {
            this.isLogin = true
            this.isBuyer = true
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err.response)
          console.log(err)
        })
    },
    logOut () {
      this.isLogin = false
      this.isAdmin = false
      this.isBuyer = false
      this.$router.push('/')
    },
    checkLoginStatus () {
      if (localStorage.token && localStorage.role == 'admin') {
        this.isLogin = true
        this.isAdmin = true
      } else if (localStorage.token && localStorage.role == 'buyer') {
        this.isLogin = true
        this.isBuyer = true
      } else {
        this.isLogin = false
        this.isAdmin = false
        this.isBuyer = false
      }
    },
    getProducts () {
      relicApi
        .get('/products')
        .then(({ data }) => {
          this.products = [...data.reverse()]
          this.productsCopy = [...data.reverse()]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    pushProduct (payload) {
      this.products.unshift(payload)
    },
    updateProduct (payload) {
      let index = this.products.findIndex(el => {
          return el._id == payload._id
      })
      this.products.splice(index, 1, payload)
    },
    deleteProduct (payload) {
      let newData = this.products.filter(el => {
        return el._id !== payload._id
      })
      this.products = newData
      this.productsCopy = [...newData]
    },
    addCart (payload) {
      relicApi({
        url: `/carts`,
        method: 'post',
        data: {
          userId: payload.userId,
          productId: payload.productId,
          qty: payload.qty
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          alertify.success('added to cart')
          let index = this.carts.findIndex(el => {
            return el.productId._id === data.productId._id
          })
          if (index >= 0) {
            this.carts.splice(index, 1, data)
          } else {
            this.carts.unshift(data)
          }
        }).catch((err) => {
          if(!localStorage.token) {
            alertify.error('Please Login First!')
          } else {
            alertify.error('Product is Out of Stock')
          }
          console.log(err)
        })
    },
    getCarts () {
      relicApi({
        url: `/carts`,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = data
          console.log(data, '====== data carts')
        }).catch((err) => {
          console.log(err)
        })
    },
    removeCartItem (payload) {
      let remove = this.carts.filter(el => {
        return el._id !== payload._id
      })
      this.carts = remove
    },
    updateCart (payload) {
      let index = this.carts.findIndex(el => {
          return el._id == payload._id
      })
      this.carts.splice(index, 1, payload)
    },
    emptyCart () {
      console.log('emtpy cart')

      this.carts = []
    },
    searchProduct (payload) {
      console.log(payload)
      let searchObj = [...this.products]
      let regex = new RegExp('.*' + payload + '.*', "i")
      let searched = searchObj.filter(el => {
        return el.name.match(regex) || el.category.match(regex)
      })
      console.log(searched)
      this.searcedProducts = searched
      this.$router.push(`/search?keyword=${payload}`)
    }
  },
  created () {
    this.checkLoginStatus()
    this.getProducts()
    if(localStorage.token && localStorage.role == 'buyer') {
      this.getCarts()
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
