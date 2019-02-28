<template>
  <v-container>
    <v-layout column wrap>
      <v-flex 12 xs class="mb-4">
        <h2 class="text-xs-center">Delivery details</h2>
      </v-flex>

      <v-flex xs-12>
        <v-form>
          <h6 class="red--text">{{errors}}</h6>
          <v-text-field
            @change="getShippingCost"
            v-model="city_name"
            solo
            label="Adress City (Indonesia only)"
          ></v-text-field>
          <v-select
            @change="getShippingCost"
            v-model="courier"
            :items="selectCourier"
            solo
            label="select courier"
          ></v-select>
        </v-form>
      </v-flex>
      <v-flex xs12 v-if="isLoading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
      <v-flex xs-12 v-else>
        <h2 class="text-xs-center">Total Billing</h2>
        <h3 class="text-xs-left mt-4">Item Price: Rp {{totalPrice.toLocaleString()}}</h3>
        <h3 class="text-xs-left red--text">Shipping Cost: Rp {{shippingCost.toLocaleString()}}</h3>
        <hr>
        <h3 class="text-xs-left green--text">Final Price: Rp {{finalPrice.toLocaleString()}}</h3>
      </v-flex>

      <v-flex xs-12>
        <v-btn
          @click.prevent="addTransaction"
          class="mt-4"
          large
          color="primary"
          style="text-decoration:none;"
        >
          <v-icon class="mr-2">payment</v-icon>Complete Purchase
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import server from "@/api/server.js";

export default {
  name: "Checkout",
  data() {
    return {
      city_name: "",
      courier: "",
      selectCourier: ["jne", "pos", "tiki"],
      cartId: this.$route.params.cartId,
      totalPrice: this.$route.params.totalPrice,
      shippingCost: 0,
      errors: "",
      isLoading: false
    };
  },
  computed: {
    finalPrice() {
      return this.totalPrice + this.shippingCost;
    }
  },
  methods: {
    getShippingCost() {
      this.errors = "";
      if (this.city_name == "" || this.courier == "") {
        this.errors = "please fill in your city name and select courier";
      } else {
        this.erros = "";
        this.isLoading = true;
        server
          .post(
            "/transactions/shippingCost",
            {
              city_name: this.city_name,
              courier: this.courier
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            this.shippingCost = data.shippingCost;
            this.isLoading = false;
          })
          .catch(({ response }) => {
            if (this.city_name == "") {
              this.errors == "please fill city name and select courier";
            } else if (response.statusText == "Not Found") {
              this.errors = "sorry, delivery to your city is not available yet";
            }
            console.error(response);
          });
      }
    },
    addTransaction() {
      this.errors = "";
      if (this.city_name == "" || this.courier == "") {
        this.errors = "please fill city name and select courier";
      } else {
        server
          .post(
            "/transactions",
            {
              cartId: this.cartId,
              totalPrice: this.totalPrice,
              shippingCost: this.shippingCost,
              finalPrice: this.finalPrice
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            return server.put("/carts/emptyCart", {}, {
              headers: {
                token: localStorage.getItem("token")
              }
            });
          })
          .then(() => {
            return swal(
              "purchase success",
              "please confirm when you're product has arrived",
              "success"
            );
          })
          .then(() => {
            this.$router.push({ path: "/" });
          })
          .catch(({ response }) => {
            console.error(response);
          });
      }
    }
  }
};
</script>

<style>
</style>
