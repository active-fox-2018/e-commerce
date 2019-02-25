<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Admin-Page</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" id="admin-navbar" href="#" @click="logout">Logout <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <!-- <a class="nav-link" id="admin-navbar" href="#" @click="getAllProducts">Products Lib <span class="sr-only"></span></a> -->
                        <router-link id="admin-navbar" to="/admin/products-lib"  class="nav-link" >Library</router-link>
                    </li>
                    <li class="nav-item active">
                        <!-- <a class="nav-link" id="admin-navbar" href="#" @click="getAllProducts">Products Lib <span class="sr-only"></span></a> -->
                        <router-link id="admin-navbar" to="/admin/add-product"  class="nav-link" >Add Product</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        props: ['AllProducts'],
        created() {
            // this.getAllProducts()
            // console.log(this.allproducts, '-=====')
        },
        data() {
            return {
                adminIsLogin: false,
                loginForm: false,
                productForm: false,
                allProducts: []
            }
        },
        methods: {
            sendAllProducts() {
                // this.$emit('all-products', this.allProducts)
                // router.push
            },
            logout() {
                this.adminIsLogin = false
                this.loginForm = true
                this.productForm = false
                localStorage.removeItem('token')
                swal('Bye Admin')
                this.$router.push({
                    name: 'admin'
                })
            }
        }
    }
</script>

<style>

</style>
