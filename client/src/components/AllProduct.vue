<template>
  <v-container fluid grid-list-sm fill-height>
    <v-layout row justify-start wrap>
      <v-flex v-for="(product, index) in allProduct" :key="index" xs3>
        <v-card height="100%" width="100%">
          <v-img :src="product.image" aspect-ratio="2"></v-img>
          <h3 class="headline mt-2 mb-0">{{product.name}}</h3>
          <div>Rp {{product.price.toLocaleString()}}</div>
          <v-btn
            flat
            color="blue"
            v-if="userRole=='admin'"
            @click.prevent="editProduct(product)"
          >Edit</v-btn>
          <v-btn
            flat
            color="blue"
            v-if="userRole=='admin'"
            @click.prevent="deleteProduct(product._id)"
          >Delete</v-btn>
          <br>
          <v-btn
            color="success"
            class="mb-3"
            @click.prevent="viewProductDetails(product)"
          >View Details</v-btn>
          <v-btn color="blue" class="mb-3" @click.prevent="addToCart(product)">
            <v-icon>shopping_cart</v-icon>Add To Cart
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import server from "@/api/server";
import swal from "sweetalert";

export default {
  name: "AllProduct",
  data() {
    return {
      allProduct: []
    };
  },
  props: ["userRole"],
  created() {
    this.getAllProduct();
  },
  methods: {
    getAllProduct() {
      server
        .get("/products")
        .then(({ data }) => {
          this.allProduct = data.data;
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    editProduct(product) {
      this.$router.push({
        path: "/editproduct",
        name: "editproduct",
        params: { product }
      });
    },
    deleteProduct(productId) {
      swal({
        title: "Delete this product?",
        text: "Once deleted, you won't be able to recover it",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            return server
              .delete(`/products/${productId}`, {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then(() => {
                return server.get("/products");
              })
              .then(({ data }) => {
                this.allProduct = data.data;
                swal("you're product has been deleted", {
                  icon: "success"
                });
              });
          }
        })
        .catch(({ response }) => {
          if (response.data.message == "data not found") {
            this.allProduct = [];
            swal("you're product has been deleted", {
              icon: "success"
            });
          }
          console.error(response);
        });
    },
    viewProductDetails(product) {
      this.$router.push({
        path: "/productdetails",
        name: "productdetails",
        params: { productDetails: product }
      });
    },
    addToCart(product) {
      if (!localStorage.getItem("token")) {
        swal("you have to login first!", {
          buttons: ["continue browsing", "login now"]
        }).then((value) => {
          if(value) this.$router.push('/authpage/register')
        })
      }
      server
        .put(
          "/carts/addToCart",
          {
            productId: product._id
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$router.push({ path: "/cart" });
        })
        .catch(({ response }) => {
          console.error(response);
        });
    }
  }
};
</script>

<style>
</style>

