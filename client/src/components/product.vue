<template>
  <div id="product">
   
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Upload Product</h5>

              <form class="form-signup" @submit.prevent="uploadProduct" enctype="multipart/form-data">
                <div class="form-label-group">
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Product Name"
                    v-model="name"
                  >
                  <label for="inputEmail">Product Name</label>
                </div>
                <div class="form-label-group">
                  <input
                    type="text"
                    id="inputName"
                    class="form-control"
                    placeholder="Description"
                    v-model="description"
                  >
                  <label for="inputName">Description</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="text"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Price"
                    required
                    v-model="price"
                  >
                  <label for="inputPassword">Price</label>
                </div>

                 <div class="form-label-group">
                  <input
                    type="text"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Stock"
                    required
                    v-model="stock"
                  >
                  <label for="inputPassword">Stock</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="file"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    @change="getFile"
                  >
                  <label for="inputPassword">Image</label>
                </div>

             
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                  upload product
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
import axios from '../api/server'
export default {
  name: "product",
  data () {
    return {
      name : '',
      description : '',
      price : '',
      stock : '',
      image : ''
    }
  },
  methods : {
    getFile(e) {
      this.image = e.target.files[0]
    },
    uploadProduct() {

      let newProduct = {
        name : this.name,
        description : this.description,
        price : this.price,
        stock : this.stock,
        image : this.image
      }
      console.log(newProduct);
      
      let formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(newProduct))
      console.log(formData,"=======didialam");
      
      this.$store.dispatch('uploadProduct', formData)
    }
  }
}
</script>

