<template>
    <div class="container">
        <img v-if="loading" src="https://cdn.cssauthor.com/wp-content/uploads/2018/06/Silver-Balls-Swinging.gif" alt="">
        <h3 class="my-4">Add Product</h3>
        <form class="mt-7" @submit.prevent="addProduct">  
            <div class="form-group row my-5">
                <label for="inputEmail39" class="col-sm-2 col-form-label">Product Name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail30" placeholder="e.g. 'Pampers Baby'" v-model="name">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword31" class="col-sm-2 col-form-label">Price</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputPassword3" placeholder="17000" v-model="price">
                </div>
            </div>
            <div class="form-group row my-5">
                <label for="inputEmail4" class="col-sm-2 col-form-label">Stock</label>
                <div class="col-sm-10">
                <input type="number" class="form-control" id="inputEmail10" placeholder="10" v-model="stock">
                </div>
            </div>
            <div class="form-group row my-5">
                <label class="col-sm-2 col-form-label">Image</label>
                <div style="position:relative;" class="my-3">
                    <a class='btn btn-primary' href='javascript:;'>
                    Choose File
                    <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40" @change="getFile">
                    </a>
                    <span class='label label-info' id="upload-file-info"></span>
                </div>
            </div>
            <div>
                <button class="btn btn-primary" type="submit">Add Product</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        data() {
            return {
                name: '',
                price: null,
                stock: null,
                file: '',
                loading: false
                // imageUrl
            }
        },
        methods: {
            addProduct() {
                let productToAdd = new FormData()
                productToAdd.append('imageUrl', this.file)
                productToAdd.append('name', this.name)
                productToAdd.append('price', this.price)
                productToAdd.append('stock', this.stock)

                axios.post('/products', productToAdd, {
                    headers: {
                        'Content-Type' : 'multipart/form-data',
                        access_token: localStorage.getItem('token')
                    },
                })
                .then(({data}) => {
                    // if (!newProduct) {
                    //     this.loading = true
                    // } else {
                    //     this.loading = false
                    //     swal('Product has been successfully added')
                    // }
                    this.sendNewProduct(data)
                    swal('Success creating a product')
                    this.$router.push({
                        name: 'allProducts'
                    })
                    this.name = ''
                    this.price = null
                    this.stock = null
                })
                .catch(err => {
                    console.log(err)
                })
            },
            sendNewProduct(payload) {
                this.$emit('new-product', payload)
            },
            getFile(e) {
                this.file = e.target.files[0]
            }
        }
    }
</script>

<style>

</style>
