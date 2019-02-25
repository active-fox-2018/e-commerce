import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

import axios from '@/api/server'
export default new Vuex.Store({
  state: {
    isLogin: false,
    allProduct: [],
    userRole: '',
    activeCart: [],
    userCartId: '',
    currentPage: 'home',
    productInSearch : []
  },
  created() {
    this.getAllData()
  },
  mutations: {
    login(state, payload) {
      state.isLogin = payload.value
      state.userCartId = payload.cart
      state.userRole = payload.role
      if (payload.role == 'admin') {
        router.push({ path: '/dashboard' })
      } else {
        router.push({ path: '/' })
      }
    },
    uploadProduct(state, payload) {
      state.allProduct.push(payload)
      swal('product created')
      router.push({ path: '/dashboard' })
    },
    started(state, payload) {
      state.allProduct = payload
    },
    token(state, payload) {
      state.isLogin = payload
      // router.push({path : '/main'})
    },
    logout(state, payload) {
      state.isLogin = payload
      router.push({ path: '/' })
    },
    role(state, payload) {
      state.userRole = payload
    },
    deleteProduct(state, payload) {
      let reloadedData = state.allProduct.filter(product => {
        return product._id !== payload
      })
      state.allProduct = reloadedData
    },
    addToCart(state, payload) {
      for (let i = 0; i < payload.quantity; i++) {
        state.activeCart.push(payload.item)
      }
    },
    updateProduct(state, payload) {
      for (let i = 0; i < state.allProduct.length; i++) {
        if (state.allProduct[i]._id == payload._id) {
          state.allProduct[i] = payload
        }
      }
      swal('product updated')
      router.push({ path: '/dashboard' })
    },
    checkout(state, payload) {
      state.activeCart = []
      swal(`thank you for your shopping`)
    },
    search(state, payload) {
       
      let regex = new RegExp('.*' + payload + '.*', "i")
      let data = state.allProduct.filter(el => {
          return el.name.match(regex)
      })
      state.productInSearch = data
      router.push('/search')
    }
  },

  actions: {

    getAllData(context) {
      axios
        .get('/products')
        .then(data => {
          context.commit('started', data.data)
        })
        .catch(err => {
          console.log(err);

        })
    },

    login(context, payload) {
      axios
        .post('/users/login', {
          email: payload.email,
          password: payload.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('role', data.user.role)
          context.commit('login', { role: data.user.role, value: true, cart: data.user.cart })
        })
        .catch(({ response }) => {
          swal(response.data.error)
        })
    },

    uploadProduct(context, payload) {
      axios
        .post('/products', payload, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.commit('uploadProduct', data)
          // console.log(response);           
        })
        .catch(({response}) => {
          swal(response.data.error)
          // console.log(err)
        })
    },

    deleteProduct(context, payload) {
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then((isConfirm) => {
        if (isConfirm) {
          swal({
            title: 'Deleted!',
            text: 'your article are successfully deleted!',
            icon: 'success'
          })
            .then(() => {
              axios
                .delete(`/product/${payload}`, {
                  headers: {
                    token: localStorage.getItem('token')
                  }
                })
                .then(() => {
                  context.commit('deleteProduct', payload)
                })
              // .catch(err => {
              //   console.log(err);

              // })
              // axios
              //     .delete(`${urlLink}/posting/${id}`,{ headers : { token : localStorage.getItem('token')}})
              //     .then((data) => {
              //         let deleted = this.allpostings.filter(arr => {
              //             return arr._id !== id
              //         })
              //         this.userPostings = deleted
              //     })

            })
            .catch(err => {
              swal('our server are busy, please try again')
            })
        } else {
          swal("Cancelled", "Your posting is safe :)", "error");
        }
      })
      // swal('are you sure')

    },

  },
})
