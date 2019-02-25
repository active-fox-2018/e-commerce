import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: '',
  },
  mutations: {
    signIn(state, payload) {
      state.isLogin = payload;
    },
    signOut(state, payload) {
      state.isLogin = payload;
    },
    checkRole(state, payload) {
      state.role = payload;
    }
  },
  actions: {
    checkInStore({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/users/auth',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        commit('signIn', true);
        commit('checkRole', response.data.role);
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
});
