<template>
  <div class="container">
    <div class="row" v-if="searchedProduct">
      <div class="col-sm-3" v-for="product in searchedProduct">
        <div class="card" style="width:100%">
          <div class="card-header">{{product.name}}</div>
          <img class="card-img-top" :src="product.image" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">{{product.description}}</p>
            <p class="card-text">Price : Rp.{{Number(product.price).toLocaleString()}}</p>
            <p class="card-text">stock(s) {{product.stock}}</p>
            <p>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                @click="selectProduct(product._id)"
              >buy</button>
              <!-- <button href="#" class="btn btn-primary" @click="updateProduct(product._id)">update</button> -->
            </p>
          </div>
        </div>
        <cart :selected-product="selectedProduct"/>
      </div>
    </div>

  </div>
</template>
<script>

import cart from "@/components/cartPage.vue";
export default {
  name: "search",
  data () {
      return {
          selectedProduct : ''
      }
  },
  components : {
      cart
  },
  computed : {
      searchedProduct() {
          return this.$store.state.productInSearch
      }
  },
  methods: {

    selectProduct(id) {
      let data = this.$store.state.allProduct.filter(product => {
        return product._id == id;
      });
      this.selectedProduct = data[0];
    }
  }

};
</script>
