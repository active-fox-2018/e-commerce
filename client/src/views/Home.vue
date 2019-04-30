<template>
  <div class="home">
    <Banner></Banner>
    <Loading v-if="loading"></Loading>
    <Products v-else></Products>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/Banner.vue';
import Products from '@/components/Products.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'home',
  components: {
    Banner, Products, Loading,
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
