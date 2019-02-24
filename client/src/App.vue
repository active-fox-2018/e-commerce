<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile >
          <v-text-field
          hide-details
          prepend-icon="search"
          single-line>
          </v-text-field>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/" style="text-decoration:none">
              <v-list-tile-title>Home</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.login">
          <v-list-tile-action>
            <v-icon>fas fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/users" style="text-decoration:none">
              <v-list-tile-title>My Account</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.login && $store.state.type==='admin'">
        <v-list-tile-action>
            <v-icon>fas fa-file-invoice</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/users/transactions" style="text-decoration:none">
              <v-list-tile-title>Transaction Page</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>fas fa-tshirt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/items" style="text-decoration:none">
              <v-list-tile-title>Show Items</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
         <v-list-tile  v-if="!$store.state.login">
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-dialog v-model="dialogLogin" persistent max-width="600px">
            <v-list-tile-title slot="activator">Sign In</v-list-tile-title>
            <fromUser @dialog="changeDialog" :action="'login'"/>
            </v-dialog>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!$store.state.login">
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-dialog v-model="dialogRegister" persistent max-width="600px">
            <v-list-tile-title slot="activator">Register</v-list-tile-title>
            <fromUser @dialogRegist="changeDialogRegister" :action="'register'"/>
            </v-dialog>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile  v-if="$store.state.login">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="signout">
            <router-link to="/" style="text-decoration:none">
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="white" light fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>STORE</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-title> -->
        <v-badge left>
      <span slot="badge">{{$store.state.carts.length}}</span>
      <router-link to = "/shopping" style="text-decoration:none">
      <v-icon
        medium
        color="grey lighten-1"
      >
        shopping_cart
      </v-icon>
      </router-link>
    </v-badge>
      <!-- </v-toolbar-title>  -->
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
        <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="white" app>
      <span class="black--text">&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import fromUser from '@/components/formUser.vue'
export default {
  components: {
    fromUser
  },
  created () {
    this.$store.dispatch('getAllItems')
    if (localStorage.getItem('token')) {
      this.$store.dispatch('getAllData')
      this.$store.dispatch('getAllCarts')
    }
  },
  data () {
    return {
      drawer: null,
      dialogLogin: false,
      action: '',
      dialogRegister: false
    }
  },
  props: {
    source: String
  },
  methods: {
    changeDialog (payload) {
      this.dialogLogin = payload
    },
    changeDialogRegister (payload) {
      this.dialogRegister = payload
    },
    signout () {
      localStorage.removeItem('token')
      this.$store.commit('isLogin', false)
      this.$store.commit('addToCart', [])
    }
  }
}
</script>
<style>
/* *:not(path):not(g) {
  color: hsla(210, 100%, 100%, 0.9) !important;
  background: hsla(210, 100%,  50%, 0.5) !important;
  outline: solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
  box-shadow: none !important;
} */
</style>
