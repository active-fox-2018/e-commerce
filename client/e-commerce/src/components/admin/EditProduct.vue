<template>
    <div>
        <!-- {{this.$route.params}} -->
        <!-- {{DataToEdit}} -->
        <h3 class="my-4">Edit Product</h3>
        <form class="mt-7" @submit.prevent="editProduct">  
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
            <!-- <div class="form-group row my-5">
                <label class="col-sm-2 col-form-label">Image</label>
                <div style="position:relative;" class="my-3">
                    <a class='btn btn-primary' href='javascript:;'>
                    Choose File
                    <input type="file" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="file_source" size="40" @change="getFile">
                    </a>
                    <span class='label label-info' id="upload-file-info"></span>
                </div>
            </div> -->
            <div>
                <button class="btn btn-primary" type="submit">Edit Product</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        created() {
            this.id = this.$route.params.data._id
            this.name = this.$route.params.data.name
            this.price = this.$route.params.data.price
            this.stock = this.$route.params.data.stock
            this.imageUrl = this.$route.params.data.imageurl
        },
        data() {
            return {
                // DataToEdit: this.$route.params.data,
                id: '',
                name: '',
                price: null,
                stock: null,
                imageUrl: ''
            }
        },
        methods: {
            editProduct() {
                swal({
                    title: "Are you sure want to edit this product?",
                    // text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    })
                .then((willUpdate) => {
                    if (willUpdate) {
                        axios.put(`/products/${this.id}`, {
                            name: this.name,
                            stock: this.stock,
                            price: this.price
                        }, {
                            headers: {
                                access_token: localStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            this.$router.replace('/admin/products-lib')
                            swal("Product has been updated!", {
                                icon: "success",
                            });
                            this.refresh()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    } else {
                        
                    }
                });
            },
            refresh() {
                this.$emit('refresh-products')
            }
        }
    }
</script>

<style>
    
</style>
