<template>
  <q-card elevate bordered class="my-card">
    <q-card-section>
      <div class="text-h6" style="text-align: center">Add Product</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <div class="q-pa-md">
        <label>Name</label>
        <q-input v-model="name" filled type="name"/>
        <br>
        <br>
        <label>Price</label>
        <q-input v-model="price" filled type="price"/>
        <br>
        <br>
        <label>Stock</label>
        <q-input v-model="stock" filled type="stock" />
        <br>
        <br>
        <label>Description</label>
        <q-input v-model="description" filled type="textarea" />
        <br>
        <br>
        <label>Image</label>
        <input type="file" ref="myFiles" @change="previewFiles" multiple>

        <div class="row justify-end">
        <q-btn
          type="submit"
          :loading="submitting"
          @click="addProduct"
          label="Add Product"
          class="q-mt-md"
          color="black"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios'
let link = 'http://localhost:3000'

export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      price: '',
      stock: '',
      description: '',
      submitting: false,
      file: ''
    }
  },
  methods: {
    addProduct () {

      this.submitting = true
      const formData = new FormData()
      formData.append('image', this.file[0])
      formData.append('name', this.name)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('description', this.description)

      axios
          .post(
              `${link}/products`,
              formData,
              {headers: {"Content-Type" : 'multipart/form-data', token: localStorage.getItem('tokenAdmin')}})
          .then(({data}) => {
              this.name = ''
              this.price = ''
              this.stock = ''
              this.description = ''
              this.file = ''
              this.submitting = false
              this.$q.notify({icon: 'thumb_up', message: data.status, position: 'top-right'})
          })
          .catch((error) => {
              this.submitting = false
              this.$q.notify({color: 'negative', message: error.response.data.status, position: 'top-right'})
          })

    },
      previewFiles() {
      this.file = this.$refs.myFiles.files
    },
  }
}
</script>

<style>

</style>
