<template>
  <v-app>
    <Navbar :is_login="isLogin" :role="role" @logout="checkLogin"/>

    <v-content>
      <router-view @logged_in="checkLogin" @admin="role = 'admin'" @user="role = 'user'"/>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/api/server.js'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isLogin: false,
      role: 'user'
    }
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem('token')) {
        api
          .post('/verifyToken', { token: localStorage.getItem('token') })
          .then(({data}) => {
            if (data.msg) {
              this.isLogin = false
              this.role = 'user'
            } else {
              this.isLogin = true
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        this.isLogin = false
        this.role = 'user'
      }
    },
  },
}
</script>
