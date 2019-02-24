<template>
  <v-form @submit.prevent="EditProduct">
    <h1>Edit "{{name}}"</h1>
    <v-container>
      <v-layout column>
        <v-flex xs12>
          <v-text-field v-model="name" label="Product Name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="price" label="Price"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="stock" label="Stock"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <label class="btn btn-primary">
            <h5>
              <i class="fa fa-image"></i> Upload an image of your product
            </h5>
            <input
              @change="updateImage"
              ref="imageRef"
              type="file"
              style="display: none;"
              name="image"
            >
          </label>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout align-center justify-content-center row>
          <v-flex xs6>
            <v-img v-if="imagePreviewURL" :src="imagePreviewURL"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <v-btn type="submit" large color="black white--text">Save Changes</v-btn>
  </v-form>
</template>

<script>
import server from "@/api/server";
import swal from "sweetalert";

export default {
  name: "EditProduct",
  data() {
    return {
      id: this.$route.params.product._id,
      name: this.$route.params.product.name,
      price: this.$route.params.product.price,
      stock: this.$route.params.product.stock,
      image: this.$route.params.product.images,
      imagePreviewURL: this.$route.params.product.imagePreviewURL
    };
  },
  created() {
    console.log("-----", this.imagePreviewURL);
  },
  methods: {
    updateImage(e) {
      let imageFile = e.target.files[0];
      this.imagePreviewURL = URL.createObjectURL(imageFile);
      this.image = this.$refs.imageRef.files[0];
    },
    EditProduct() {
      var body = {
        name: this.name,
        price: this.price,
        stock: this.stock,
        imagePreviewURL: this.imagePreviewURL
      };
  
      let data = new FormData();
      data.append("image", this.image);
      data.append("data", JSON.stringify(body));

      server
        .put(`/products/${this.id}`, data, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          swal("Done!", "you're updates has been saved", "success").then(
            value => {
              this.$router.push({ path: "/" });
            }
          );
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
