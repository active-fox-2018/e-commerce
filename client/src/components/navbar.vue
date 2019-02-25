<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
      <div class="col-md-4">
        <router-link to="/" class="navbar-brand">Benk-shop</router-link>
      </div>

      <div class="col-md-4">
        <form class="form-inline my-2 my-lg-0" @submit.prevent="search">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            v-model="querySearch"
          >
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div class="col-md-4">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter2"
            >my cart</button>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard" v-if="userRole == 'admin'">dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/product" v-if="userRole == 'admin'">Product</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">signup</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href v-if="login" @click="logout()">logout</a>
            <router-link class="nav-link" to="/login" v-if="!login">login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <cartDetail/>
  </div>
</template>

<script>
import cartDetail from "@/components/detailCart.vue";
export default {
  name: "signup",
  props: ["query-search"],
  components: {
    cartDetail
  },
  data() {
    return {};
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("token", true);
    }
    if (localStorage.getItem("role")) {
      this.$store.commit("role", localStorage.getItem("role"));
    }
  },
  computed: {
    login() {
      let data = localStorage.getItem("token");
      return this.$store.state.isLogin;
    },
    userRole() {
      return this.$store.state.userRole;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout", false);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    search() {
      this.$store.commit("search", this.querySearch);
    }
  }
};
</script>

