<template>
  <div class="card" id="login">
    <div class="card card-body" style="">
    <div class="align-self-center">
    <h2 style="text-align : center"> LOGIN </h2>
    <img src= "" alt="..." style="width : 300px">
    </div>  
    <form @submit.prevent="login">
        <div class="form-group">
          <label for="emailLogin">Email address</label>
          <input type="email" class="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="passwordLogin">Password</label>
          <input type="password" class="form-control" id="passwordLogin" placeholder="Password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      email: '',
      password: ''
    }
  }, 
  methods : {
    login() {

    }
  }
}
</script>

<style>
</style>
