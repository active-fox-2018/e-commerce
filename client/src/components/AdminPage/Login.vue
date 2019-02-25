<template>
  <q-layout style="background-color:rgb(84,84,84)">
    <div class="column items-center">
      <div class="col" style="height: 25vh"></div>
      <div class="col">
          <q-card class="my-card bg-white text-black" style="width: 400px; height:">
            <q-card-section>
              <div class="text-h6">Login</div>
            </q-card-section>

            <q-card-section>
              <label>Username</label>
              <q-input rounded outlined v-model="username"  />
              <br>
              <label>Password</label>
              <q-input rounded outlined v-model="password" type="password" />
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn :loading="loginProcess" color="white" class="text-black" style="border-radius: 15px; width: 100px" @click="adminLogin">
                Login
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
    </div>
  </q-layout>
</template>

<script>
import axios from 'axios'
let link = 'http://localhost:3000'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      loginProcess: false
    }
  },
  created () {
  },
  methods: {
    adminLogin () {
      this.loginProcess = true

      axios
        .post(`${link}/admin/login`, {username: this.username, password: this.password})
        .then(({data}) => {
          console.log(data)
          localStorage.setItem('tokenAdmin', data.token)
          this.$store.commit('tokenAdmin')
          this.loginProcess = false
          this.$q.notify({icon: 'thumb_up', message: data.status, position: 'top-right'})
          this.$router.push({path: '/admin/products'})
        })
        .catch((error) => {
          this.loginProcess = false
          this.$q.notify({color: 'negative', message: error.response.data.status, position: 'top-right'})
        })
    }
  }
}
</script>

<style>
</style>
