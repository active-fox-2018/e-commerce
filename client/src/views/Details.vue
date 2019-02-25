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
                  <div class="display-1">{{product.name}}</div>
                  <br>
                  <div
                    v-if="product.price"
                    class="headline red--text font-weight-medium"
                  >IDR. {{product.price.toLocaleString()}}</div>
                  <div>
                    <v-layout align-center>
                      <v-btn fab dark small @click="count > 1? count--:count = 1" color="primary">
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
                </v-card-text>

                <v-card-actions class="text-sm-center">
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
            console.log('added to cart');
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        console.log('you have to login first');
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
