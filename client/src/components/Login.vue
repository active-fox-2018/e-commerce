<template>
<div class="card mt-4 mx-auto" style="max-width: 70vw">
  <div class="card-body">
   <form @submit.prevent="login">
        <fieldset class="text-left">
            <legend>Login form</legend>
            <div class="form-group">
            <input v-model="input" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email / phone number">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            </div>
        </fieldset>
        <router-link to="/">
            <button type="button" class="btn btn-secondary float-right ml-2" style="background-color: #f2f2f2">
                Close
            </button>
        </router-link>
        <button type="submit" class="btn btn-primary float-right">Submit</button>
    </form>
  </div>
</div>

</template>

<script>
import server from '@/server/local.js'
import alertify from 'alertifyjs'

export default {
  name: 'login',
  data () {
    return {
      input: '',
      password: ''
    }
  },
  methods: {
    login () {
      server({
        method: 'post',
        url: `/users/login`,
        data: {
          input: this.input,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.$router.push({ name: 'home' })
          localStorage.setItem('token', data.token)
          this.$emit('set-user', data.data)
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error('Oopss something went wrong!')
          }
        })
    }
  }

}
</script>

<style>

</style>
