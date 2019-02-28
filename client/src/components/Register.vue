<template>
  <v-form @submit.prevent="signUp">
    <h3 class="subheading white--text font-weight-regular">Create a new account</h3>
    <br>
    <v-btn flat color="blue lighten-4" :to="'/authpage/login'">
      <h4 class="black--text mr-2" style="text-decoration: none;">Already have an account?</h4>sign in here
    </v-btn><br>
    <span class="orange--text title font-weight-regular">{{errors.username}}</span>
    <v-text-field solo v-model="username" label="Username" required></v-text-field>
    <span class="orange--text title font-weight-regular">{{errors.email}}</span>
    <v-text-field solo v-model="email" label="E-mail" required></v-text-field>
    <span class="orange--text title font-weight-regular">{{errors.password}}</span>
    <v-text-field solo v-model="password" type="password" label="Password" required></v-text-field>
    <v-btn block type="submit" color="success">Sign Up</v-btn>
  </v-form>
</template>

<script>
import server from '@/api/server.js'

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      user: {},
      errors: {}
    };
  },
  methods: {
    signUp() {
      server
        .post("/users/register", {
          username: this.username,
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
          this.errors = {};
          console.error(response);

          if (response.data.err.errors) {
            var err = response.data.err.errors;
            for (var key in err) {
              this.errors[key] = err[key].message;
            }
          }
        });
    }
  }
};
</script>

<style>
</style>
