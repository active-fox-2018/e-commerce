import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: [],
    role : ''
  },
  mutations: {
    mutateRole : (state, payload) => {
      state.role = payload
    },
    showAddProductButton: (state) => {
      state.showAddProduct = !state.showAddProduct
    },
    addProduct: (state, payload) => {
      state.products.unshift(payload)
    },
    initialProduct : (state,payload) => {
      state.products = payload
      console.log('====>>',state.products)
    },
    showModal : (state, componentName) => {
      console.log('shw modal')
      state.modalVisible = true,
      state.modalComponent = componentName
    },
    hideModal : (state) => {
      state.modalVisible = false
    }
  },
  actions: {
    login : (context,payload) => {
      axios
      .post('/users/login',payload)
      .then(({data}) => {
        console.log(data)
        context.commit('mutateRole', data.role)
        localStorage.setItem('role',data.role)
        localStorage.setItem('token',data.access_token)
      })
    },
    addProduct: (context, payload) => {

      axios
        .post(`/products`, payload
          // ,{headers: {
          //         token: localStorage.getItem('token')
          //     }}
        )
        .then(({ data }) => {
          console.log('masuk')
          context.commit('addProduct', data)
          context.dispatch('getAllProduct')
          // return this.getAllArticle()
        })
        .catch(error => {
          console.log(error);
          // this.errorMsg = error.response.data.message
        })
    },
    getAllProduct : (context) => {
      axios
        .get(`/products`)
        .then(({data}) => {
          context.commit('initialProduct', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct : (context, payload) => {
      axios
        .delete(`/products/${payload}`)
        .then(({data})=>{
          console.log(`data id ${data._id} is deleted succesfuly ` )
          context.dispatch('getAllProduct')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct : (context, payload) => {
      axios
        .put(`/products/${payload.id}`, payload.data)
        .then(({data})=>{
          console.log(`data id ${data.id} updated`)
          context.dispatch('getAllProduct')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
