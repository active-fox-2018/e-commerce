<template>
  <section class="hero is-fullheight">
    <div class="hero-body is-centered">
      <h1 class="title">
          New Products From Us
        </h1>
    </div>
    <div class="hero-body">
      <div class="content">
        <div class="columns is-centered is-multiline is-mobile">
          <Card v-for="(product, index) in products" :product="product" :key="index"></Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'products',
  components: {
    Card,
  },
  data() {
    return {
      // img: 'https://storage.googleapis.com/digitalin-storage/1550795158170Jake-Quotes-adventure-time-with-finn-and-jake-38940455-1920-1080.jpg',
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
