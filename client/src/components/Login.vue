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
          this.clear()
          this.$emit('logged_in')

          if (data.user.role === 'user') {
            this.$router.push({ name: "home" })
          } else if (data.user.role === 'admin') {
            localStorage.setItem('role', 'admin')
            this.$emit('admin')
            this.$router.push({ name: "admin" })
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    clear () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
