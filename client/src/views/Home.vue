<template>
  <v-app id="inspire">
    <Navbar :userRole="userRole" @logout="userRole=null"/>
    <v-content>
      <!-- <v-container fluid fill-height> -->
      <!-- <v-layout> -->
      <v-flex text-xs-center>
        <router-view :userRole="userRole"></router-view>
      </v-flex>
      <!-- </v-layout> -->
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Homepage",
  data() {
    return {
      userRole: localStorage.getItem("role")
    };
  },
  components: {
    Navbar
  }
};
</script>