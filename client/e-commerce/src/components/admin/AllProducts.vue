<template>
    <div class="container">
        <div class="card my-5" v-for="product in AllProductsInLibs" :key="product.id">
            <!-- {{product}} -->
            <img :src="product.imageUrl" class="container card-img-top my-5 mx-auto justify-content-center" style="max-height: 50%; max-width: 70%;" :alt="product.name">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Price: {{ product.price }} || Stock: {{ product.stock }}</p>
                <p class="card-text"><small class="text-muted">Created at {{ product.created_at }}</small></p>
            </div>
            <button class="btn btn-primary" @click="populate(product._id)"> Edit Product</button>
            <button class="brn btn-danger" @click="remove(product._id)">Delete</button>
        </div>
    </div>
</template>

<script>
    import axios from '@/api/server.js'
    import EditProduct from '@/components/admin/EditProduct.vue'

    export default {
        props: ['AllProductsInLibs'],
        created() {
            // console.log(this.$route.params)
        },
        watch: {
            AllProducts(val) {
                axios.get('/products')
                .then(({products}) => {
                    this.AllProductsInLibs = products
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        methods: {
            convertDate(date) {
                let tanggal = date.getDate()
                let bulan = date.getMonth() + 1
                let tahun = date.getFullYear()
                let hari = date.getDay()
                switch (hari) {
                    case 1:
                        hari = 'Senin'
                        break;
                    case 2:
                        hari = 'Selasa'
                        break;
                    case 3:
                        hari = 'Rabu'
                        break;
                    case 4:
                        hari = 'Kamis'
                        break;
                    case 5: 
                        hari = 'Jumat'
                        break;
                    case 6:
                        hari = 'Sabtu'
                        break;
                    case 7:
                        hari = 'Minggu'
                        break;
                    default:
                        break;
                }
                return `${hari}, ${bulan}-${tanggal}=${tahun}`
            },
            remove(id) {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this product!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete(`/products/${id}`, {
                            headers: {
                                access_token: localStorage.getItem('token')
                            }
                        })
                        .then(({data}) => {
                            swal("Product has been deleted!", {
                                icon: "success",
                            });
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    } else {
                        
                    }
                });
            },
            populate(id) {
                axios.get(`/products/${id}`)
                .then(({data}) => {
                    console.log(data.product)
                    // this.$emit('populate-product', data.product)
                    this.$router.push({
                        name: 'editProduct',
                        path: `/admin/edit-product/`,
                        params: {
                            id: data.product._id,
                            data: data.product
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style>

</style>
