<template>
  <v-form @submit.prevent="AddProduct">
    <h1 class="mt-2">Add A New Product</h1>
    <v-container>
      <v-layout column>
        <v-flex xs12>
          <h6 class="text-xs-left red--text" v-if="errors.name">{{errors.name}}</h6>
          <v-text-field v-model="name" label="Product Name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <h6 class="text-xs-left red--text" v-if="errors.price">{{errors.price}}</h6>
          <v-text-field v-model="price" label="Price"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <h6 class="text-xs-left red--text" v-if="errors.stock">{{errors.stock}}</h6>
          <v-text-field v-model="stock" label="Stock"></v-text-field>
        </v-flex>
        <h6 style="color: red;" v-if="errors.image">{{errors['image']}}</h6>
        <v-flex xs12>
          <label class="btn btn-primary">
            <h5>
              <i class="fa fa-image"></i> Upload an image of your product
            </h5>
            <input
              @change="uploadImage"
              ref="imageRef"
              type="file"
              style="display: none;"
              name="image"
            >
          </label>
        </v-flex>
        <v-container>
          <v-layout align-center justify-content-center row>
            <v-flex v-if="isLoading">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-flex>
            <v-flex xs6 v-else>
              <v-img v-if="imagePreviewURL" :src="imagePreviewURL"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-container>

    <v-btn type="submit" large color="black white--text">POST</v-btn>
  </v-form>
</template>

<script>
import server from "@/api/server";
import swal from "sweetalert";

export default {
  name: "AddProduct",
  data() {
    return {
      name: "",
      price: "",
      stock: 0,
      image: "",
      imagePreviewURL: "",
      errors: {},
      isLoading: false
    };
  },
  methods: {
    uploadImage(e) {
      this.isLoading = true
      let imageFile = e.target.files[0];
      this.imagePreviewURL = URL.createObjectURL(imageFile);
      this.image = this.$refs.imageRef.files[0];
      this.isLoading = false
    },
    AddProduct() {
      this.isLoading = true
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
        .post("/products", data, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.isLoading = false
          swal(
            "Done!",
            "you're product has been succesfully posted",
            "success"
          ).then(value => {
            this.$router.push({ path: "/" });
          });
        })
        .catch(({ response }) => {
          console.error(response);
          this.errors = {};
          if (!this.image) {
            this.errors["image"] = "please upload an image of your product";
          } else if (response.data.err) {
            for (let key in response.data.err.errors) {
              this.errors[key] = response.data.err.errors[key].message;
            }
          }
          console.log(this.errors);
        });
    }
  },
  watch: {
    errors(val) {
      this.errors = val;
    }
  }
};
</script>

<style>
</style>
