<template>
<div class="card mt-4 mx-auto" style="max-width: 70vw">
  <div class="card-body">
    <form @submit.prevent="addProduct" class="text-left">
      <fieldset>
        <legend>Add Product</legend>

        <div class="form-group">
          <label> Name</label>
          <input required v-model="name" type="text" class="form-control" placeholder="Enter product name">
        </div>

        <div class="form-group">
          <label>Description</label>
          <input v-model="description" type="text" class="form-control" placeholder="Enter product description">
        </div>

        <div class="form-group">
          <label>Price</label>
          <input v-model="price" type="number" class="form-control" placeholder="Enter your product price">
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input v-model="qty" type="number" class="form-control" placeholder="Enter product quantity">
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

export default {
  name: 'addProduct',
  data () {
    return {
      name: '',
      description: '',
      price: '',
      image: '',
      imageUrl: '',
      qty: ''
    }
  },
  methods: {
    addProduct () {
      let data = new FormData()
      data.append('name', this.name)
      data.append('description', this.description)
      data.append('price', this.price)
      data.append('image', this.image)
      data.append('qty', this.qty)

      server({
        method: 'post',
        url: `/products`,
        data,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit('new-product', data)
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
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
