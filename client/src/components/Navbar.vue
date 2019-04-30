<template>
<nav class="navbar is-light">
  <div class="navbar-brand">
    <a class="navbar-item" @click.prevent="$router.push('/')" >
      <p id="logo" class="is-size-3">
        Candy Candy
      </p>
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span>Cart</span>
      <span>Logout</span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control" v-if="!isLogin">
            <a class="button is-primary" @click.prevent="$router.push('/login')">
              <span>login</span>
            </a>
          </p>
          <p class="control" v-if="!isLogin">
            <a class="button is-primary" @click.prevent="$router.push('/register')">
              <span>register</span>
            </a>
          </p>
          <p class="control" v-if="isAdmin" @click.prevent="toDashboard">
            <a class="navbar-item">
              Admin Dashboard
            </a>
          </p>
          <p class="control">
            <a @click.prevent="toCart">
              <span class="mdi mdi-cart mdi-24px"></span>
              <span class="badge" style="position:relative; bottom:4px;">{{ cartCounter }}</span>
              <!-- <span><font-awesome-icon size="2x" icon="shopping-cart" /></span> -->
            </a>
          </p>
          <p class="control" v-if="isLogin">
            <a class="button is-primary" @click.prevent="logout">
              <span>Logout</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style>
.badge {
    background-color: #6394F8;
    border-radius: 10px;
    color: white;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    padding: 3px 7px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
}
</style>


<script>
import swal from 'sweetalert';

export default {
  name: 'navbar',
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.commit('loginSuccess');
    }
  },
  methods: {
    logout() {
      swal('Goodbye.', {
        icon: 'success',
        button: true,
        timer: 1750,
      });
      this.$store.commit('logout');
      this.$router.push('/');
    },
    toDashboard() {
      this.$router.push('/admin');
    },
    toCart() {
      if (!this.isLogin) {
        swal('Please login first.', {
          timer: 1750,
          button: true,
        });
      } else {
        this.$router.push('/carts');
      }
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    cartCounter() {
      return this.$store.state.cartCounter;
    },
  },
  data() {
    return {
    };
  },
};
</script>
