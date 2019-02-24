<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app v-if="userRole=='admin'">
      <v-list dense>
        <v-list-tile :to="'/addproduct'">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add a new Product</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="blue-grey" dark fixed app prominent>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" v-if="userRole=='admin'"></v-toolbar-side-icon>
      <v-btn flat class="ml-0" style="text-decoration: none;" :to="'/'">
        <v-toolbar-title>Minishop</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
        <v-btn style="text-decoration: none; " color="blue" :to="'/cart'">
          <v-icon color="white">shopping_cart</v-icon>your cart
        </v-btn>
      <div v-if="userRole">
        <v-tooltip bottom>
          <template #activator="data">
            <v-btn icon color="blue-grey" @click.prevent="logout">
              <v-icon v-on="data.on" color="white">exit_to_app</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip>
      </div>
      <span v-else>
        <v-btn :to="'/authpage/login'" flat color="white">login</v-btn>
        <v-btn :to="'/authpage/register'" outline color="white">sign up</v-btn>
      </span>
    </v-toolbar>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  name: "Navbar",
  data: () => ({
    drawer: null,
    dialog: false
  }),
  props: ["userRole", "cartLength"],
  methods: {
    logout() {
      swal("Sign out from your account?", {
        buttons: ["cancel", "yes"]
      }).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.$emit("logout");
      });
    }
  }
};
</script>

