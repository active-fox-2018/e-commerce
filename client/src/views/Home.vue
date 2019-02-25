<template>
  <div class="home">
    <navbar
    :query-search ="querySearch"/>
    <router-view/>
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import mainPage from '@/components/mainPage.vue'
import navbar from '@/components/navbar.vue'
export default {
  name: 'home',
  data() {
    return {
      querySearch : ''
    }
  },
  computed : {
    page () {
      return this.$store.state.currentPage
    }
  },
  components: {
    navbar,
    mainPage
  }
}
</script>
