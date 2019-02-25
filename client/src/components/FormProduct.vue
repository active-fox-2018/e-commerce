<template>
<v-card>
  <v-container>
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
        v-model="price"
        type="number"
        v-validate="'required'"
        label="Price"
        :error-messages="errors.collect('price')"
        data-vv-name="price"
        required
      ></v-text-field>
      <v-text-field
        v-model="stock"
        v-validate="'required'"
        label="Stock"
        :error-messages="errors.collect('stock')"
        data-vv-name="stock"
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
  </v-container>
</v-card>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import api from '@/api/server.js'
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Vue.use(VeeValidate)
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    name: '',
    price: 0,
    stock: 0,
    imageName: '',
		imageUrl: '',
		imageFile: '',
    dictionary: {
      custom: {
        name: {
          required: () => 'Name can not be empty'
        },
        price: {
          required: () => 'Please input Price'
        },
        stock: {
          required: () => 'Stock can not be empty'
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
            let newProduct = {
              name: this.name,
              price: this.price,
              stock: this.stock
            }
            let formData = new FormData
            formData.append('data', JSON.stringify(newProduct))
            formData.append('file', this.imageFile)
            api
              .post('/products', formData, { headers: {token: localStorage.getItem('token')} })
              .then(({data}) => {
                Toast.fire({
                  type: 'success',
                  title: 'Success add product'
                })
                this.$router.push({ name: 'admin' })
                this.$emit('new_product', data)
                this.clear()
              })
              .catch(err => {
                console.log(err);
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
      this.price = 0
      this.stock = 0
      this.imageName = ''
      this.imageUrl = ''
      this.imageFile = ''
      this.$validator.reset()
    }
  }
}
</script>
