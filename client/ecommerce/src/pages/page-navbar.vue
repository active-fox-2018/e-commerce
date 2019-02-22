<template>
  <div class="row">
    <div class="col">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">E-commerce</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/products">
                Products
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/carts">Cart</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >User</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/transactions">Transaction history</router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="signOut()">Sign out</button>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">{{userName}} ({{userEmail}})</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" @submit.prevent="searchProducts()">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchBox"
            >
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userName", "userEmail", "userRole"],
  data() {
    return {
      searchBox: ""
    };
  },
  watch: {
    searchBox() {
      //this.searchProducts();
    }
  },
  methods: {
    searchProducts() {
      this.$emit("search-products", this.searchBox);
    },
    signOut() {
      signOut();
    }
  }
};
</script>
