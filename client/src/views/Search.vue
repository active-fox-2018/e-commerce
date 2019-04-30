<template>
  <div class="hero-body">
    <div class="columns is-centered">
      <div class="column">
        <h1 class="title">Search for "{{ $route.query.q }}"</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column" v-if="results.length">
        <div class="columns is-centered is-multiline is-mobile">
          <Card v-for="(product, index) in results" :product="product" :key="index"></Card>
        </div>
      </div>
      <div class="column is-centered" v-else>
          <figure class="image">
            <h2>no result. but here's for you</h2>
            <img
              src="https://storage.googleapis.com/digitalin-storage/1551032593978maxresdefault-2.jpg"
              alt
            >
          </figure>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  components: {
    Card,
  },
  computed: {
    results() {
      return this.$store.state.searchResults;
    },
  },
};
</script>

<style>
</style>
