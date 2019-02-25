<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer v-if="$route.path === '/' || $route.path === '/search'"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
export default {
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn();
    }
    this.$store.dispatch('getProducts');
  },
  components: {
    Navbar, Footer,
  },
  methods: {
    loggedIn() {
      this.$store.commit('loginSuccess');
      this.$store.dispatch('getUserCart');
      this.$store.dispatch('getUserTransactions');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic');

#logo {
  font-family: 'Nanum Gothic', sans-serif;
  size: 1em;
}

#sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

a {
  text-decoration: none;
}

img.isBorder {
  padding: 5px;
  border: 1px solid rebeccapurple;
  }
/*
<aside class="column is-2 aside hero is-fullheight" id="sidebar" style="height: 25vh;">
        <Sidebar />
      </aside>
*/

/* *:not(path):not(g) {
  color: hsla(210, 100%, 100%, 0.9) !important;
  background: hsla(210, 100%,  50%, 0.5) !important;
  outline: solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
  box-shadow: none !important;
} */
</style>
