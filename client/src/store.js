import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/e-commerce';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productData: {},
    searchResults: [],
    userCart: {},
    userTransactions: [],
    allTransactions: [],
    cartCounter: 0,
    isLogin: false,
    isAdmin: false,
    loading: false,
  },
  mutations: {
    loginSuccess(state) {
      state.isLogin = true;
      state.isAdmin = localStorage.getItem('role') === 'admin';
    },
    logout(state) {
      localStorage.clear();
      state.isLogin = false;
      state.isAdmin = false;
      state.cartCounter = 0;
    },
    loading(state, payload) {
      state.loading = payload;
    },
    loadProducts(state, payload) {
      state.products = payload;
    },
    loadCart(state, payload) {
      state.userCart = payload;
    },
    loadDetail(state, payload) {
      state.productData = payload;
    },
    loadTransactions(state, payload) {
      state.userTransactions = payload;
    },
    loadAllTransactions(state, payload) {
      state.allTransactions = payload
    },
    addProduct(state, payload) {
      // console.log(payload);
      state.products.unshift(payload);
    },
    cartCount(state, payload) {
      state.cartCounter += payload;
    },
    minusStock(state) {
      state.productData.stock -= 1;
    },
    editTotalPrice(state, payload) {
      state.userCart.totalPrice += payload;
    },
    pushToCart(state, payload) {
      let cek = false;
      state.userCart.products.forEach((e) => {
        if (payload._id === e.productId._id) {
          cek = true;
          e.quantity += 1;
        }
      });
      if (!cek) {
        state.userCart.products.push({ productId: payload, quantity: 1 });
      }
    },
    removeFromCart(state, index) {
      // console.log(state.userCart)
      const { products } = state.userCart;
      // console.log(products);
      if (products[index].quantity === 1) {
        products.splice(index, 1);
      } else {
        products[index].quantity -= 1;
      }
    },
    clearCart(state) {
      state.userCart.products = [];
      state.userCart.totalPrice = 0;
    },
    search(state, data) {
      state.searchResults = data
    },
    checkout(state, data) {
      state.userTransactions.unshift(data)
    },
    shippingStatus(state, index) {
      state.allTransactions[index].status = 'shipping'
    },
    arriveStatus(state, index) {
      state.userTransactions[index].status = 'arrived'
    }
  },
  actions: {
    getProducts({ commit }) {
      // console.log(commit)
      commit('loading', true);
      api({
        method: 'get',
        url: '/products',
      })
        .then(({ data }) => {
          commit('loading', false);
          commit('loadProducts', data.data);
          // console.log('Document successfully written with Id!', docRef.id)
        })
        .catch((error) => {
          commit('loading', false);
          console.error('ERR: ', error.message);
        });
    },
    getDetails({ commit }, id) {
      commit('loading', true);
      api({
        method: 'get',
        url: `/products/${id}`,
      })
        .then(({ data }) => {
          commit('loadDetail', data.data);
          commit('loading', false);
        })
        .catch((error) => {
          commit('loading', false);
          console.log(error.message);
        });
    },
    getUserCart({ commit }) {
      commit('loading', true);
      api({
        method: 'get',
        url: '/carts',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          console.log(data.message);
          commit('loadCart', data.data);
          const counter = data.data.products.reduce((a, b) => a + b.quantity, 0);
          commit('cartCount', counter);
          commit('loading', false);
        })
        .catch((error) => {
          commit('loading', false);
          console.log(error);
        });
    },
    getUserTransactions({commit}) {
      api({
        method: 'get',
        url: '/transactions/user',
        headers: { token: localStorage.getItem('token')},
      })
        .then(({ data }) => {
          // console.log(data);
          commit('loadTransactions', data);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAllTransaction({commit}) {
      api({
        method: 'get',
        url: '/transactions',
        headers: { token: localStorage.getItem('token')},
      })
        .then(({ data }) => {
          // console.log(data);
          commit('loadAllTransactions', data);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart({ commit }, product) {
      commit('loading', true);
      api({
        method: 'put',
        url: `/carts/products/${product._id}`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          console.log(data.message);
          commit('loading', false);
          commit('cartCount', 1);
          commit('minusStock');
          commit('editTotalPrice', product.price);
          commit('pushToCart', product);
        })
        .catch((error) => {
          console.log(error);
          commit('loading', false);
        });
    },
    searchProduct({ commit }, search) {
      commit('loading', true)
      api({
        method: 'get',
        url: `/products/search?q=${search}`,
      })
        .then(({ data }) => {
          // console.log(data.message)
          // console.log(data.data)
          commit('search', data.data)
          commit('loading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('loading', false)
        })
    },
  },
});
