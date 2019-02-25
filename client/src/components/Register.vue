<template>
  <div>
    <h1>Register</h1>
    <form>
      <v-text-field
        v-model="name"
        v-validate="'required'"
        label="Name"
        :error-messages="errors.collect('name')"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        label="E-mail"
        :error-messages="errors.collect('email')"
        data-vv-name="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required'"
        type="password"
        label="Password"
        :error-messages="errors.collect('password')"
        data-vv-name="password"
        required
      ></v-text-field>
      <img :src="imageUrl" height="150" v-if="imageUrl"/>
      <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onFilePicked"
      >

      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import api from '@/api/server.js'

Vue.use(VeeValidate)
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    imageName: '',
		imageUrl: '',
		imageFile: '',
    dictionary: {
      custom: {
        name: {
          required: () => 'Name can not be empty'
        },
        email: {
          required: () => 'Email can not be empty'
        },
        password: {
          required: () => 'Password can not be empty'
        }
      }
    }
  }),
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    submit () {
      this.$validator.validateAll()
        .then(valid => {
          if (valid) {
            let newUser = {
              name: this.name,
              email: this.email,
              password: this.password
            }
            let formData = new FormData
            formData.append('data', JSON.stringify(newUser))
            formData.append('file', this.imageFile)
            api
              .post('/register', formData)
              .then(({data}) => {
                this.$router.push({ name: 'login' })
                this.clear()
              })
              .catch(err => {

              })
          }
        })
    },
    pickFile () {
        this.$refs.image.click()
    },
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    clear () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.imageName = ''
      this.imageUrl = ''
      this.imageFile = ''
      this.$validator.reset()
    }
  }
}
</script>
