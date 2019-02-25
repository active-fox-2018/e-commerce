<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-black text-white row justify-between">
      <q-toolbar>
        <Logo></Logo>

         <q-btn @click="logOut" push color="white" text-color="black" label="Logout" style="width:70px;"/>

      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/admin/products" label="Products" />
        <q-route-tab to="/admin/addProduct" label="Add Product" />
        <q-route-tab to="/admin/transactions" label="Transactions" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Logo from '../components/Logo.vue'
export default {
  name: 'AdminHome',
  components: {
    Logo
  },
  created () {
    this.$store.dispatch('fetchTransactionAsAdmin')
  },
  methods: {
    checkAdmin () {
      if (localStorage.getItem('token')) {

      } else {
        this.$router.push({path: '/admin/login'})
      }
    },
    logOut () {
      this.$store.commit('logOutAdmin')
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>

</style>
