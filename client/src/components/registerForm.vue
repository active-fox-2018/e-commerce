<template>
<div class="card mt-4 mx-auto" style="max-width: 70vw">
  <div class="card-body">
    <form @submit.prevent="register" class="text-left">
      <fieldset>
        <legend>Register</legend>

        <div class="form-group">
          <label> Name</label>
          <input required v-model="name" type="text" class="form-control" placeholder="Enter your name">
        </div>

        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input required v-model="email" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
          <label required for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Password">
        </div>

        <div class="form-group">
          <label>Address</label>
          <input v-model="address" type="text" class="form-control" placeholder="Enter your name">
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input v-model="phone" type="text" class="form-control" placeholder="Enter your phone number">
        </div>

        <div class="form-group">
          <label for="exampleInputFile">Image input</label>
          <br>
          <input type="file" @change.prevent="handleFileUpload" class="mt-3" id="file" ref="file"/>
        </div>

        <div v-if="imageUrl" >
            <img class="img-art" style="width: 100%; height: 100%" :src="imageUrl" alt="image" >
        </div>

        <router-link to="/">
            <button type="button" class="btn btn-secondary float-right ml-2 mt-2" style="background-color: #f2f2f2">
                Close
            </button>
        </router-link>
        <button type="submit" class="btn btn-primary float-right mt-2">Submit</button>
      </fieldset>
    </form>
  </div>
</div>

</template>

<script>
import server from '@/server/local.js'
import alertify from 'alertifyjs'

export default {
  name: 'registerForm',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      image: '',
      imageUrl: ''
    }
  },
  methods: {
    register () {
      let data = new FormData()

      data.append('name', this.name)
      data.append('email', this.email)
      data.append('password', this.passowrd)
      data.append('address', this.address)
      data.append('phone', this.phone)
      data.append('image', this.image)
      server({
        method: 'post',
        url: `/users`,
        data
      })
        .then(({ data }) => {
          this.$router.push({ name: 'home' })
          localStorage.setItem('token', data.token)
          this.$emit('set-user', data.data)
        })
        .catch(err => {
          if (err.response.data) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
          }
          console.log(err.response)
        })
    },
    handleFileUpload () {
      this.imageUrl = URL.createObjectURL(this.$refs.file.files[0])
      this.image = this.$refs.file.files[0]
    }
  }
}
</script>

<style>

</style>
