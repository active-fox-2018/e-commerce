<template>
  <v-container>
    <v-layout row wrap justify-content-center align-center fill-height>
      <v-flex xs10>
        <v-card>
          <v-layout>
            <v-flex xs4>
              <v-img :src="product.image" height="300px" contain></v-img>
            </v-flex>
            <v-flex x8>
              <v-card-title primary-title>
                <div>
                  <div class="display-2">{{product.name}}</div><br>
                  <div class="headline text-xs-left">Price: Rp {{product.price.toLocaleString()}}</div>
                  <div class="headline text-xs-left">Stock: {{product.stock}}</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">User Rating
            <v-spacer></v-spacer>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
            <v-icon>star_border</v-icon>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ProductDetails",
  data() {
    return {
      product: this.$route.params.productDetails
    };
  }
};
</script>

<style>
</style>
