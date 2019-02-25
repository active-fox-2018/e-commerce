<template>
  <div class="card">
    <header class="card-header has-background-link">
    <p class="card-header-title has-text-white">
      {{ product.title }}
    </p>
  </header>
    <div class="card-content" style="line-height:30px !important;">
      <div class="content has-text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Modi eveniet asperiores a dolor labore,
        non nulla quo voluptatum ad ducimus tenetur autem iusto provident ex quos,
        veniam reiciendis laudantium tempora.
        {{ product.description }}
      </div>
    </div>
    <div class="card-content" style="line-height:30px !important;" v-if="product.price">
      <p class="has-text-left has-text-danger has-text-weight-bold is-size-4" >
        {{ thePrice }}
      </p>
      <p class="has-text-left has-text-success is-size-5">
        stock: {{ stock }}
      </p>
    </div>
    <footer class="card-footer">

      <p class="card-footer-item has-text-grey-dark">
        <a @click.prevent=""><span>
        Wishlist
        </span></a>
      </p>
      <p class="card-footer-item has-text-grey-dark">
        <a @click.prevent="addToCart"><span>
        Add to Cart
        </span></a>
      </p>
    </footer>
  </div>
</template>

<script>
import getPrice from '@/helpers/getPrice';
import swal from 'sweetalert';

export default {
  data() {
    return {
    };
  },
  methods: {
    addToCart() {
      if (!this.isLogin) {
        swal('Please login first.', {
          timer: 1750,
          button: true,
        });
      } else if (this.product.stock < 1) {
        swal('Product is out of stock, dont worry we will restock soon', {
          timer: 1750,
        });
      } else {
        swal('Added To Cart', {
          button: true,
          timer: 1750,
        })
        this.$store.dispatch('addToCart', this.product);
      }
    },
  },
  computed: {
    product() {
      return this.$store.state.productData;
    },
    stock() {
      return this.product.stock;
    },
    thePrice() {
      return getPrice(this.product.price);
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style>

</style>
