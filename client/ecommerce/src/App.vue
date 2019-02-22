<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <h1>E-commerce</h1>
        <div class="container">
          <div v-if="showError" class="alert alert-warning" role="alert" v-html="errorMessage"></div>
        </div>
      </div>
    </div>

    <div class="container" v-if="isLoggedIn">
      <page-navbar
        :user-name="userName"
        :user-email="userEmail"
        :user-role="userRole"
        @search-products="searchProducts($event)"
      ></page-navbar>

      <router-view
        :user-name="userName"
        :user-email="userEmail"
        :user-role="userRole"
        :product-data="productData"
        :cart-data="cartData"
        @display-error="displayError($event)"
        @get-products="getProducts($event)"
        @get-carts="getCarts($event)"
      />

      <page-footer></page-footer>
    </div>

    <div class="container" v-if="!isLoggedIn">
      <loginregister></loginregister>
    </div>

    <div class="container">
      <div id="googleSigninButton2" class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
import pageNavbar from "@/pages/page-navbar.vue";
import loginregister from "@/pages/loginregister.vue";
import pageFooter from "@/pages/page-footer.vue";

export default {
  components: {
    pageNavbar,
    loginregister,
    pageFooter
  },
  created() {
    this.loginCheck()
  },
  data() {
    return {
      isLoggedIn: false,
      showError: false,
      errorMessage: "",
      userName: "",
      userEmail: "",
      userRole: "",
      productDataAll: [],
      productData: [],
      cartData: []
    };
  },
  methods: {
    async searchProducts(searchQuery) {
      this.productData = this.productDataAll.filter(e => {
        return (
          e.name.includes(searchQuery) || e.description.includes(searchQuery)
        );
      });
    },
    async getProducts() {
      try {
        let productData = await axios({
          baseURL,
          method: "GET",
          url: "/api/products",
          headers: { token }
        });
        this.productDataAll = productData.data;
        this.productData = this.productDataAll.map(e => e);
      } catch (err) {
        this.displayError(err);
      }
    },
    async getCarts() {
      try {
        let cartData = await axios({
          baseURL,
          method: "GET",
          url: "/api/carts",
          headers: { token }
        });
        this.cartData = cartData.data;
      } catch (err) {
        this.displayError(err);
      }
    },
    loginCheck() {
      loginDetails.listener = () => {
        if (loginDetails.status) {
          this.userName = loginDetails.response.name;
          this.userEmail = loginDetails.response.email;
          this.userRole = loginDetails.response.role || "";
          this.isLoggedIn = true;
        } else {
          this.userName = "";
          this.userEmail = "";
          this.userRole = "";
          this.isLoggedIn = false;
          this.displayError(loginDetails.response);
        }
      };
    },
    displayError: function(error) {
      if (error.response) {
        this.errorMessage = error.response.data.message;
      } else if (error.message) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = "<pre>" + JSON.stringify(error, null, 2) + "</pre>";
      }
      this.showError = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.showError = false;
      }, 10000);
    }
  }
};
</script>


<style>
</style>
