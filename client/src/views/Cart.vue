<template>
  <div class="container" style="margin-top: 30px;">
    <div v-for="(product, index) in userCart.products"
      :key="product._id"
      class="columns columns is-centered is-multiline is-mobile is-vcentered">
      <div class="column">
        <div class="columns" style="margin-left: 20px !important;">
          <div class="column is-offset-1 is-2 is-one-quarters--mobile">
            <figure class="image is-4by3">
              <img class="isBorder" :src="product.productId.image" alt="">
            </figure>
          </div>
          <div class="column is-7 is-half--mobile">
            <p class="has-text-centered is-size-4 is-pulled-left">
              {{ product.productId.title }}
            </p>
          </div>
        </div>
      </div>
      <div class="column is-2 is-one-quarters-mobile">
        <div class="columns">
          <div class="column">
            <div class="column">
              <p class="is-size-5 has-text-link has-text-weight-bold">
                {{ thePrice(product.productId.price) }}
              </p>
            </div>
            <div class="column">
              <p class="has-text-success is-size-6">
                Quantity: {{ product.quantity}}
              </p>
            </div>
            <div class="column">
              <p>
                <a class="button is-danger"
                  @click.prevent="minusOne(index, product.productId.price, product.productId._id)">
                    <span class="mdi mdi-minus"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-1 is-half">

      <div class="column">
        <p class="is-size-4">Total : {{ thePrice(userCart.totalPrice) }}</p>
      </div>
      <div class="column">
        <div class="columns is-mobile">
          <div class="column is-half-mobile">
            <a @click.prevent="checkout"
              class="button is-success" >
              <span class="mdi mdi-cash-usd">
                </span><span>Checkout</span>
            </a>
            
            <a @click.prevent="toTransaction" class="button is-info">
              <span class="mdi mdi-calendar">
                </span><span>Transaction</span>
            </a>
          </div>
          <div class="column is-half-mobile">
            <a @click.prevent="clearCart()"
              class="button is-danger">
                <span class="mdi mdi-delete"></span>
                <span>Clear Cart</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="container" v-if="isTransaction">
    <Transaction v-for="(transaction, index) in userTransactions" :key="transaction._id" :transaction="transaction" :index="index"></Transaction>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import getPrice from '@/helpers/getPrice';
import api from '@/api/e-commerce';
import Transaction from '@/components/Transaction';

export default {
  name: 'cart',
  components: {
    Transaction,
  },
  methods: {
    thePrice(price) {
      return price ? getPrice(price) : '';
    },
    minusOne(index, price, productId) {
      api({
        method: 'delete',
        url: `/carts/products/${productId}`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          console.log(data.message);
          this.$store.commit('removeFromCart', index);
          this.$store.commit('cartCount', -1);
          this.$store.commit('editTotalPrice', -price);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    clearCart() {
      api({
        method: 'delete',
        url: '/carts/products',
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          swal({
            title: 'Are you sure?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                this.$store.commit('clearCart');
                swal(data.message, {
                  timer: 1750,
                  button: true,
                  icon: 'success',
                });
              }
            });
        });
    },
    checkout() {
      swal({
        title: "Are you sure?",
        buttons: true,
      })
        .then((result) => {
          if(!this.userCart.products.length) {
            swal('there is no product to checkout', {
              timer: 1750,
            })
          } else if (result) {
            api({
              method: 'put',
              url: '/carts/checkout',
              headers: { token: localStorage.getItem('token')},
              data: { cart: this.userCart }
            })
              .then(({ data }) => {
                this.$store.commit('clearCart');
                swal(
                  "Thanks!",
                  "Successfully checkout your cart", {
                    timer: 1750,
                    icon: 'success',
                  }
                );
                this.$store.commit("checkout", data);
                console.log(data)
              })
              .catch(({ response }) => {
                console.log(response);
              });
        }
      });
    },
    toTransaction() {
      this.isTransaction = !this.isTransaction
    },
  },
  data() {
    return {
      isTransaction: false,
    }
  },
  computed: {
    userCart() {
      return this.$store.state.userCart;
    },
    userTransactions() {
      return this.$store.state.userTransactions;
    }
  },
};
</script>

<style>

</style>
