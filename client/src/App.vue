<template>
  <div id="app">
    <Navbar :check-login="signIn" :role="checkRole" />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('checkInStore');
    }
  },
  computed: {
    signIn() {
      return this.$store.state.isLogin;
    },
    checkRole() {
      return this.$store.state.role;
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
