<template>
  <div class="container" style="text-align:left">
    <h1>Log In</h1>
    <div class="alert alert-secondary" role="alert" v-if="alert">
        {{alertMsg}}
    </div>
    <form style="width:50%;" @submit.prevent="logIn()">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter email"
          v-model="email"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        >
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      alert: false,
      alertMsg: ''
    }
  },
  methods: {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    logIn () {
      let data = {
        email: this.email,
        password: this.password
      }
      this.$emit('log-in', data)
    }
  }
}
</script>

<style>
</style>
