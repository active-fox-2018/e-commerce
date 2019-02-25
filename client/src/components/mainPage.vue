<template>
  <div class="mainPage">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../assets/promo1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../assets/promo2.jpg" alt="Second slide">
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm-3" v-for="product in allProduct">
          <div class="card" style="width:100%">
            <div class="card-header">{{product.name}}</div>
            <img class="card-img-top" :src="product.image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{{product.description}}</p>
              <p class="card-text">Price : Rp.{{Number(product.price).toLocaleString()}}</p>
              <p class="card-text">stock(s) {{product.stock}}</p>
              <p v-if="role !== 'admin'">
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
        </div>
      </div>
    </div>
    <update :selected-product="selectedProduct"/>
    <cart :selected-product="selectedProduct"/>
  </div>
</template>
<script>
import update from "@/components/updatePage.vue";
import cart from "@/components/cartPage.vue";
export default {
  name: "mainPage",
  components: {
    update,
    cart
  },
  data() {
    return {
      selectedProduct: "",
    };
  },
  computed: {
    allProduct() {
      return this.$store.state.allProduct;
    },
    role() {
      return this.$store.state.userRole;
    }
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    selectProduct(id) {
      let data = this.$store.state.allProduct.filter(product => {
        return product._id == id;
      });
      this.selectedProduct = data[0];
    }
  }
};
</script>
