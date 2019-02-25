<template>
  <div class="dashboard">
    
    <div class="container">
      <div class="row">
        <div class="col-sm-3" v-for="product in allProduct">
          <div class="card" style="width:100%">
            <div class="card-header">{{product.name}}</div>
            <img class="card-img-top" :src="product.image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{{product.description}}</p>
              <p class="card-text">{{product.price}}</p>
              <p>
                <button href="#" class="btn btn-primary" @click="deleteProduct(product._id)">delete</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalLong"
                  @click="selectProduct(product._id)"
                >update</button>
                <!-- <button href="#" class="btn btn-primary" @click="updateProduct(product._id)">update</button> -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <update :selected-product="selectedProduct"/>
  </div>
</template>
<script>
import update from "@/components/updatePage.vue";
export default {
  name: "dashboard",
  components: {
    update
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
