import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: 'http://localhost:3000',
    login: false,
    username: '',
    email: '',
    type: '',
    items: [],
    carts: []
  },
  mutations: {
    isLogin (state, payload) {
      state.login = payload.status
      state.email = payload.email
      state.type = payload.type
      state.username = payload.username
    },
    getAllItems (state, payload) {
      state.items = payload
    },
    addToCart(state, payload) {
      state.carts = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios({
        method: 'post',
        url: `${this.state.serverUrl}/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('isLogin', {
            status: true,
            username: data.name,
            type: data.type,
            email: data.email
          })
          this.dispatch('getAllCarts')
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
        })
    },
    getAllData ({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.serverUrl}/users`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('isLogin', {
            status: true,
            username: data.user.name,
            type: data.user.type,
            email: data.user.email
          })
        })
        .catch(err => {
          localStorage.removeItem('token')
          console.log(err)
        })
    },
    getAllItems ({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.serverUrl}/items`
      })
        .then(({ data }) => {
          commit('getAllItems', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllCarts({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.serverUrl}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        commit('addToCart', data.carts)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
