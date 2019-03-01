<template>
  <v-container>
    <v-layout row justify-space-between>
      <v-flex xs5>
        <v-card>
          <v-img :src="product.image"></v-img>
        </v-card>
      </v-flex>

      <v-flex xs7>
        <v-container fill-height fluid pt-0>
          <v-layout column>
            <v-flex>
              <v-card>
                <v-card-text>
                  <p class="display-1">{{product.name}}</p>
                  <div
                    v-if="product.price"
                    class="headline red--text font-weight-medium"
                  >IDR. {{product.price.toLocaleString()}}</div>
                  <div>
                    <v-layout align-center>
                      <v-btn fab dark small @click="count--" color="primary">
                        <v-icon dark>remove</v-icon>
                      </v-btn>
                      <v-flex xs3>
                        <v-text-field v-model="count" class="inputPrice" type="number" min="1"/>
                      </v-flex>
                      <v-btn fab dark small @click="count++" color="indigo">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                    </v-layout>
                  </div>
                  <div class="subheading text-xs-right">
                    {{product.stock}} left
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="grey lighten-2" flat @click="addToCart">Add to Cart</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from "@/api/server.js";
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

export default {
  data() {
    return {
      product: {},
      count: 1
    };
  },
  created() {
    this.getProduct();
  },
  watch: {
    count() {
      !this.count? this.count = 1:''
      this.count > this.product.stock? this.count = this.product.stock:''
    }
  },
  methods: {
    getProduct() {
      api
        .get(`/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToCart() {
      if (localStorage.getItem('token')) {
        let obj = {
          productId: this.$route.params.id,
          qty: this.count
        }
        api
          .put('/carts/addProducts', obj, { headers: {token: localStorage.getItem('token')} })
          .then(({data}) => {
            Toast.fire({
              type: 'success',
              title: 'Items added to youre cart'
            })
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: "Please login first"
        })
      }
    }
  }
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
