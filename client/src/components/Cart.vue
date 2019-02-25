<template>
  <v-container>
    <v-layout row wrap>
      <v-flex 12 xs class="mb-4">
        <v-layout align-center>
          <v-flex xs6>
            <h2 class="text-xs-left">Total Price: Rp {{totalPrice.toLocaleString()}}</h2>
          </v-flex>
          <v-flex xs3>
            <v-btn large color="primary" @click.prevent="checkout" style="text-decoration:none;">
              <v-icon class="mr-2">payment</v-icon>Buy Now
            </v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn @click.prevent="clearCart" large color="success">
              <v-icon class="mr-2">delete</v-icon>Clear Cart
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 v-for="(product, index) in products" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs3>
              <v-img :src="product.productId.image" height="100px" contain></v-img>
            </v-flex>
            <v-flex xs5>
              <v-card-title primary-title>
                <div>
                  <div class="title">{{product.productId.name}}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs3>
              <v-card-title primary-title class="pt-3">
                <div>
                  <div
                    class="green--text headline"
                  >Rp {{(product.productId.price * product.quantity).toLocaleString()}}</div>
                  <div class="text-xs-left">Quantity: {{product.quantity}}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs1>
              <v-btn
                class="mt-4"
                icon
                small
                color="grey"
                @click.prevent="reduceItem(product.productId._id)"
              >
                <v-icon class>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import server from "@/api/server.js";
import swal from "sweetalert";

export default {
  name: "Cart",
  data() {
    return {
      carts: "",
      products: []
    };
  },
  created() {
    this.getUserCart();
  },
  computed: {
    totalPrice() {
      var sum = 0;
      this.products.forEach(product => {
        sum += product.productId.price * product.quantity;
      });
      return sum;
    }
  },
  methods: {
    getUserCart() {
      server
        .get("/carts/mycart", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.carts = data.data;
          this.products = data.data.products;
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    clearCart() {
      swal({
        title: "Are you sure you want to clear your cart?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            return server
              .put(
                "carts/emptyCart",
                {},
                {
                  headers: {
                    token: localStorage.getItem("token")
                  }
                }
              )
              .then(() => {
                this.getUserCart();
              });
          }
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    reduceItem(productId) {
      server
        .put(
          "/carts/reduceItem",
          { productId },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.getUserCart();
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    checkout() {
      if (!localStorage.getItem("token")) {
        swal("you have to login first!", {
          buttons: ["continue browsing", "login now"]
        }).then(value => {
          if (value) this.$router.push("/authpage/register");
        });
      } else {
        this.$router.push({
          path: "/checkout",
          name: "checkout",
          params: { cartId: this.carts._id, totalPrice: this.totalPrice }
        });
      }
    }
  }
};
</script>

<style>
</style>
