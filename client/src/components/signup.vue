<template>
  <div id="signup">
   
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Register Form</h5>

              <form class="form-signup" @submit.prevent="register">
                <div class="form-label-group">
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="name"
                  >
                  <label for="inputEmail">Full Name</label>
                </div>
                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputName"
                    class="form-control"
                    placeholder="Email"
                    v-model="email"
                  >
                  <label for="inputName">Email</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="password"
                  >
                  <label for="inputPassword">Password</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  sign up
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
import axios from '@/api/server'
export default {
  name: "product",
  data() {
      return {
          name : '',
          email : '',
          password : ''
      }
  },
  methods : {
    register() {
      axios
          .post('/users', {
              name : this.name,
              email : this.email,
              password : this.password
          })
          .then(data => {  
              this.$router.push('/login')  
            //   swal()        
            //   console.log(data)            
          })
          .catch(err => {
              console.error(err)              
        })
    }
  }
}
</script>
