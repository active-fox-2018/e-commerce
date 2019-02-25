<template>
  <div>
    <h1>Login</h1>
    <form>
      <v-text-field
        v-model="email"
        label="Email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
      ></v-text-field>

      <v-btn @click="submit">Login</v-btn>
    </form>
  </div>
</template>

<script>
import api from '@/api/server.js'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    submit () {
      let newUser = {
        email: this.email,
        password: this.password
      }
      api
        .post('/login', newUser)
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          Toast.fire({
            type: 'success',
            title: 'Login successfully'
          })
          this.clear()
          this.$emit('logged_in')
          if (data.user.role === 'user') {
            localStorage.setItem('role', 'user')
            this.$router.push({ name: "home" })
            this.$emit('user')
          } else if (data.user.role === 'admin') {
            localStorage.setItem('role', 'admin')
            this.$emit('admin')
            this.$router.push({ name: "admin" })
          }
        })
        .catch(({response}) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: response.data.msg
          })
        })
    },
    clear () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
