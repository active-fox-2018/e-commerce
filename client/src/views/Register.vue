<template>
  <div class="container" style="text-align:left">
    <h1>Register</h1>
    <div class="alert alert-secondary" role="alert" v-if="alert">
        {{alertMsg}}
    </div>
    <form style="width:50%;" @submit.prevent="signUp()">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter name"
          v-model="name"
        >
      </div>
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
import relicApi from '@/api/index'
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
    signUp () {
      relicApi({
        url: '/users',
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.$router.push('/')
        this.alert = true
        this.alertMsg = 'Thank You For Registering!'
      }).catch((err) => {
        console.log(err)
      });
    }
  }
};
</script>

<style>
</style>
