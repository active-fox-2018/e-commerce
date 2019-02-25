import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

let link = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cartUser: [],
    transactionsAdmin: [],
    transactionsUser: [],
    adminToken: null,
    userToken: null,
    userEmail: ''
  },
  mutations: {
    tokenAdmin (state) {
      state.adminToken = localStorage.getItem('tokenAdmin')
    },
    tokenUser (state) {
      state.userEmail = localStorage.getItem('userEmail')
      state.userToken = localStorage.getItem('tokenUser')
    },
    storeProduct (state, payload) {
      state.products = payload
    },
    updateProduct (state, payload) {
      for (let i = 0; i <= state.products.length - 1; i++) {
        if (payload._id === state.products[i]._id) {
          state.products[i] = payload
        }
      }
    },
    logOutAdmin (state) {
      localStorage.removeItem('tokenAdmin')
      state.adminToken = null
    },
    logOutUser (state) {
      localStorage.removeItem('tokenUser')
      localStorage.removeItem('userEmail')
      state.userToken = null
      state.userEmail = ''
    },
    storeTransactionAdmin (state, payload) {
      state.transactionsAdmin = payload
    },
    deleteProduct (state, payload) {
      for (let i = 0; i <= state.products.length - 1; i++) {
        if (payload === state.products[i]._id) {
          state.products.splice(i, 1)
        }
      }
    },
    storeCart (state, payload) {
      state.cartUser = payload
    },
    storeTransactionUser (state, payload) {
      state.transactionsUser = payload
    },
    addTransaction (state, payload) {
      state.transactionsUser.push(payload)
    },
    emptyCart (state) {
      state.cartUser = []
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios
        .get(`${link}/products`)
        .then(({ data }) => {
          commit('storeProduct', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateProduct ({ commit, state }, payload) {
      axios
        .patch(`${link}/products/${payload._id}`, payload.updateData, { headers: { token: state.adminToken } })
        .then(({ data }) => {
          commit('updateProduct', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchTransactionAsAdmin ({ commit, state }) {
      axios
        .get(`${link}/transactions`, { headers: { token: state.adminToken } })
        .then(({ data }) => {
          commit('storeTransactionAdmin', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteProduct ({ commit, state }, payload) {
      axios
        .delete(`${link}/products/${payload}`, { headers: { token: state.adminToken } })
        .then(({ data }) => {
          commit('deleteProduct', payload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCart ({ commit, state }) {
      axios
        .get(`${link}/users`, { headers: { token: state.userToken } })
        .then(({ data }) => {
          commit('storeCart', data.cart)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart ({ commit, state }, payload) {
      axios
        .patch(`${link}/users`, { productId: payload }, { headers: { token: state.userToken } })
        .then(({ data }) => {
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchTransactionUser ({ commit, state }) {
      axios
        .get(`${link}/transactions/buyer`, { headers: { token: state.userToken } })
        .then(({ data }) => {
          commit('storeTransactionUser', data.transactions)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    newTransaction ({ commit, state }) {
      let products = []

      state.cartUser.forEach(product => {
        products.push(product._id)
      })
      axios
        .post(`${link}/transactions`, { productId: products }, { headers: { token: state.userToken } })
        .then(({ data }) => {
          commit('addTransaction', data.transaction)
          return axios.patch(`${link}/users/deleteCart`, {}, { headers: { token: state.userToken } })
        })
        .then(({ data }) => {
          commit('emptyCart')
          this.fetchTransactionUser()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeTransactionStatus ({ commit, state }, payload) {
      axios
        .patch(`${link}/transactions/buyer/${payload}`, {}, { headers: { token: state.userToken } })
        .then(({ data }) => {
          this.fetchTransactionUser()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
