<template>
  <v-form @submit.prevent="signIn">
    <h3 class="subheading white--text font-weight-regular">Sign in to your account</h3>
    <br>
    <v-btn block flat color="blue lighten-4" :to="'/authpage/register'">
      <h4 class="black--text mr-2" style="text-decoration: none;">Don't have an account?</h4>sign up here
    </v-btn>
    <span class="orange--text title font-weight-regular">{{errors}}</span>
    <v-text-field solo v-model="email" label="E-mail" required></v-text-field>
    <v-text-field solo v-model="password" type="password" label="Password" required></v-text-field>
    <v-btn block type="submit" color="success">Sign In</v-btn>
  </v-form>
</template>

<script>
import server from '@/api/server'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: ""
    };
  },
  methods: {
    signIn() {
      server
        .post("/users/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data)
          this.user = data.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", this.user.role)
          this.$router.push({path: '/'})
        })
        .catch(({ response }) => {
          console.error(response);
          this.errors = response.data.message;
        });
    }
  }
};
</script>

<style>
</style>
