<template>
  <nav class="navbar sticky-top">
    <form @submit.prevent="search()">
      <div class="d-flex justify-content-center">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping" style="background:orange">
              <button type="submit" class="buttonTrans" style="height:5vh;width:3vw">
                <i style="font-size:24px;color:black" class="fas">&#xf002;</i>
              </button>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            id="navInput"
            placeholder="search product . . ."
            aria-label="search"
            aria-describedby="addon-wrapping"
            v-model="keyword"
          >
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-center ml-4">
      <button class="buttonNavbar"><router-link to="/">Home</router-link></button>
      <button @click="filter('high grade')" class="buttonNavbar">High Grade</button>
      <button @click="filter('real grade')" class="buttonNavbar">Real Grade</button>
      <button @click="filter('master grade')" class="buttonNavbar">Master Grade</button>
      <button @click="filter('perfect grade')" class="buttonNavbar">Perfect Grade</button>
    </div>

    <div class="d-flex justify-content-center">
      <!-- Button Store -->
      <button v-if="isLogin && isAdmin" class="buttonTrans">
        <router-link to="/store">
          <img src="../assets/store.png" alt>
        </router-link>
      </button>
      <!-- Button Store -->
      <!-- Button Transaction -->
      <button v-if="isLogin & isAdmin" class="buttonTrans">
        <router-link to="/transaction">
          <img src="../assets/buy.png" alt>
        </router-link>
      </button>
      <!-- Button Transaction -->
      <!-- Button User Transaction -->
      <button v-if="isLogin & isBuyer" class="buttonTrans">
        <router-link to="/user-transaction">
          <img src="../assets/buy.png" alt>
        </router-link>
      </button>
      <!-- Button User Transaction -->
      <!-- Button Cart -->
      <button v-if="isLogin & isBuyer" class="buttonTrans">
        <router-link to="/cart">
          <img src="../assets/cart.png" alt>
          <span
            class="badge badge-light"
            style="background:orange;margin-left:-5px;"
          >{{carts.length}}</span>
        </router-link>
      </button>
      <!-- Button Cart -->
      <!-- Button Login -->
      <div class="btn-group dropleft ml-2">
        <button
          type="button"
          class="buttonNav"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          v-if="!isLogin"
        >Login</button>
        <form @submit.prevent="loginUser()" class="dropdown-menu p-4">
          <div class="form-group">
            <label>Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="email@example.com"
            >
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Password">
          </div>
          <div class="form-group">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="dropdownCheck2">
              <label class="form-check-label" for="dropdownCheck2">Remember me</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mb-2">Sign in</button>
          <br>
          <small>Didn't have an account?
            <router-link to="/register">Register Here!</router-link>
          </small>
        </form>
      </div>
      <!-- Button Login -->
      <button @click="logOut()" class="buttonNav ml-2" v-if="isLogin">Log Out</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      keyword: ''
    };
  },
  props: ["url", "carts", "isLogin", "isAdmin", "isBuyer"],
  methods: {
    loginUser() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$emit("login-user", data);
    },
    logOut() {
      localStorage.clear();
      this.$emit("log-out");
    },
    search () {
      this.$emit('search-product', this.keyword)
    },
    filter (input) {
      this.$emit('search-product', input)
    }
  },
  watch: {
    isLogin() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
</style>
