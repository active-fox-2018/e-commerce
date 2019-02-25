<template>
  <v-toolbar app>
    <v-toolbar-title>
      <router-link v-if="newRole === 'user'" to="/">
        <img src="@/assets/obien.png" height="45">
      </router-link>
      <router-link v-else-if="newRole === 'admin'" to="/admins">
        <img src="@/assets/obien.png" height="45">
      </router-link>
    </v-toolbar-title>
    <v-spacer/>

    <v-text-field label="Search" append-icon="search"/>
    <v-spacer/>

    <router-link to="/carts">
      <v-btn icon>
        <!-- <v-badge> -->
          <!-- <span slot="badge">7</span> -->
          <v-icon>shopping_cart</v-icon>
        <!-- </v-badge> -->
      </v-btn>
    </router-link>
    <router-link to="/pendings">
      <v-btn icon v-if="is_login">
        <v-icon>notifications</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/users/login">
      <v-btn flat v-if="!is_login">Login</v-btn>
    </router-link>
    <router-link to="/users/register">
      <v-btn outline v-if="!is_login">Register</v-btn>
    </router-link>
    <router-link to="/users">
      <v-btn flat v-if="is_login" @click.prevent="logout">Logout</v-btn>
    </router-link>
  </v-toolbar>
</template>

<script>
export default {
  props: ['is_login', 'role'],
  data() {
    return {
      newRole: this.role
    };
  },
  mounted() {
    this.checkRole()
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'home' })
      this.$emit('logout')
    },
    checkRole() {
    this.newRole = localStorage.getItem('role') || 'user'
    }
  },
};
</script>
<style>
a {
  text-decoration: none;
}
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
