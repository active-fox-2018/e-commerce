
<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="px-0 py-0">
        <v-layout class="blue-grey" align-center justify-center column>
          <!-- <v-flex xs12 sm8 md4> -->
          <h1 class="display-2 font-weight-bold mb-3 white--text">MiniShop</h1>
          <router-view/>
          <h4 class="subheading white--text mt-2">or</h4>
          <!-- </v-flex> -->
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import server from "@/api/server";

export default {
  name: "Authpage",
  data() {
    return {
      displayForm: "signupForm",  
      user: {}
    };
  },
};
</script>

<style>
</style>
