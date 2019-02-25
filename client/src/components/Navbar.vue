<template>
  <nav class="navbar navbar-expand-lg navbar-light m-3 border-bottom">
    <div class="container d-flex align-self">
      <router-link to="/">
        <a class="navbar-brand">My-Commerce</a>
      </router-link>
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
          <li class="nav-item dropdown">
            <a
              id="subMenu"
              class="nav-link dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Products</a>
            <div class="dropdown-menu" aria-labelledby="subMenu">
              <router-link to="/products/test">
                <a v-if="role == 'admin'" class="dropdown-item">Test Nested Routes</a>
              </router-link>
              <router-link to="/products">
                <a class="dropdown-item" >All Products</a>
              </router-link>
            </div>
          </li>
        </ul>
        <div v-if="!checkLogin">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/signin">
                <button type="button" class="btn btn-light-outline">Signin</button>
              </router-link>
            </li>
            <li class="nav-item signup">
              <router-link to="/signup">
                <button type="button" class="btn btn-light-outline">
                  <span style="color: #004be4">Signup</span>
                </button>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <button @click="signOut" type="button" class="btn btn-sm btn-primary">Signout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: ["checkLogin", "role"],
  methods: {
    signOut() {
      localStorage.removeItem("token");
      this.$store.commit("signOut", false);
      this.$router.push("/");
    }
  }
};
</script>

<style>
.signup {
  border: #004be4 1px solid;
  border-radius: 6px;
}
.btn-light-outline {
  background-color: transparent;
}
</style>
