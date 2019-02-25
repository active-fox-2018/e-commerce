<template>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="loginNow">
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                  <v-btn type="submit" color="primary">Login</v-btn>
                </v-form>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions> -->
            </v-card>
          </v-flex>
        </v-layout>
      
</template>

<script>
export default {
    data : function(){
        return {
            email : '',
            password : ''
        }
    },
    methods : {
      loginNow : function(){
        let depayload = {
          email : this.email,
          password : this.password
        }

        this.$store.dispatch('login', depayload)
      }
    }
}
</script>

