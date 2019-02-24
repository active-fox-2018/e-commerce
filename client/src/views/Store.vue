<template>
    <div class="container">
        <div class="row">
            <div class="col"><h3>Product List</h3></div>
            <div class="col">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
                    + Add Product
                </button>
            </div>
        </div>
        <hr>

        <!-- Loading -->
        <div v-if="loading" >
          <div class="spinner-border text-warning" role="status">
              <span class="sr-only"></span>
          </div>
          <div>
              {{loadingMsg}}
          </div>
        </div>
        <!-- Loading -->

        <div v-if="products.length > 0" class="container">
            <div class="row">
                <div class="col-6" v-for="(product, index) in products" :key="index">
                    <div class="cardCust">
                        <img :src="product.img">
                        <div class="col">
                            <div class="cardCust-content">
                                <span class="badge badge-warning">{{product.category}}</span>
                                <h3>{{product.name}}</h3>
                                <div>
                                    <p>{{product.description}}</p>
                                    <div class="row">
                                        <div class="col">
                                            Price: Rp.{{product.price}}
                                        </div>
                                        <div class="col">
                                            Stock: {{product.stock}}
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col d-flex flex-row-reverse bd-highlight">
                                            <button @click="deleteProduct(product._id)" class="buttonTransCard"><i style='font-size:24px' class='fas'>&#xf714;</i></button>
                                            <button @click="findOneProduct(product._id)" class="buttonTransCard " data-toggle="modal" data-target="#exampleModalScrollable"><i style='font-size:24px' class='fas'>&#xf044;</i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalScrollableTitle">Add New Product</h5>
                    <button @click="update = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <form v-on:submit.prevent="addProduct()"> -->
                        <fieldset>
                            <div class="form-group">
                                <label>Product Name</label>
                                <input v-model="name" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea v-model="description" class="form-control" rows="2"></textarea>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label>Price</label>
                                    <input v-model="price" type="number" class="form-control" placeholder="0">
                                </div>
                                <div class="col">
                                    <label>Stock</label>
                                    <input v-model="stock" type="number" class="form-control" placeholder="0">
                                </div>
                            </div>
                            <div class="input-group mb-3 mt-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Select category</label>
                                </div>
                                <select v-model="category" class="custom-select" id="inputGroupSelect01">
                                    <option selected disabled>Choose...</option>
                                    <option value="High Grade">High Grade</option>
                                    <option value="Real Grade">Real Grade</option>
                                    <option value="Master Grade">Master Grade</option>
                                    <option value="Perfect Grade">Perfect Grade</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputFile">Image</label>
                                <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" />
                            </div>
                            <div class="container" v-if="images">
                                <img :src="images" style="width:220px;height:180px;">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button @click="addProduct()" v-if="!update" type="submit" class="btn btn-primary" data-dismiss="modal">Submit</button>
                                <button @click="updateProduct()" v-if="update" type="submit" class="btn btn-primary" data-dismiss="modal">Save Update</button>
                            </div>
                        </fieldset>
                    <!-- </form> -->
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import relicApi from '@/api/index'
import alertify from 'alertifyjs'

export default {
  name: 'store',
  props: ['products'],
  data () {
    return {
      name: '',
      description: '',
      price: Number,
      stock: Number,
      category: '',
      images: '',
      update: false,
      loading: false,
      loadingMsg: ''
    }
  },
  methods: {
    addProduct () {
      this.loading = true
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('category', this.category)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('image', this.file)
      relicApi
        .post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          console.log(data, '==== data')
          this.name = ''
          this.description = ''
          this.category = null
          this.price = null
          this.stock = null
          this.file = null
          this.$emit('push-product', data)
          this.loading = false
          this.loadingMsg = 'posting product . . .'
        }).catch((err) => {
          console.log(err)
        })
    },
    handleFileUpload (event) {
      this.file = this.$refs.file.files[0]
      this.images = URL.createObjectURL(this.file)
    },
    deleteProduct (productId) {
      alertify.confirm('Confirm Delete Product', 'Are you sure want to delete this product ?', () => {
        relicApi
          .delete(`/products/${productId}`, {
            headers: {
              token: localStorage.token
            }
          })
          .then(({ data }) => {
            alertify.success('Product Deleted!')
            this.$emit('delete-product', data)
            console.log(data)
          })
          .catch(err => {
            alertify.success('Failed to Delete, Please Try Again!')
            console.log(err)
          })
      },
      () => {
        alertify.error('Cancel')
      }
      )
    },
    findOneProduct (productId) {
      relicApi({
        url: `/products/${productId}`,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.name = data.name
          this.description = data.description
          this.price = data.price
          this.stock = data.stock
          this.category = data.category
          this.images = data.images
          console.log(data)
          this.update = true
          localStorage.setItem('productId', data._id)
        }).catch((err) => {
          console.log(err)
        })
    },
    updateProduct () {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('category', this.category)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('image', this.file)
      relicApi
        .put(`/products/${localStorage.productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.update = false
          localStorage.removeItem('productId')
          this.$emit('update-product', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
form {
    text-align: left;
}
</style>
