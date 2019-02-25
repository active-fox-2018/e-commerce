<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchProducts')
    this.$store.commit('tokenAdmin')
    this.$store.commit('tokenUser')
  
  },
  computed: {
    ...mapState([
      'products'
    ])
  }
}
</script>
