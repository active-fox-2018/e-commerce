<template>
  <div id="login">
   
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Login</h5>

              <form class="form-signup" @submit.prevent="login">
                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputName"
                    class="form-control"
                    placeholder="Email address"
                    v-model="email"
                  >
                  <label for="inputName">Email</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Price"
                    required
                    v-model="password"
                  >
                  <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
      return {
          email : '',
          password : ''
      }
  },
  methods : {
    login() { 
      console.log('masuk login');
    
     this.$store.dispatch('login', { 
       email : this.email,
       password : this.password})

    },
  },
  computed : {
    isLogin() {
      console.log(this.$state.isLogin,"===========================");
      
      return this.$state.isLogin
    }
  }

}
</script>

