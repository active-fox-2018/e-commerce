<template>
    <div>
        <!-- <h2 class="my-5">P-Ns Shop</h2> -->
        <!-- <div class="d-flex"> -->
            <div class="row">
                <div class="col col-md-3" v-for="product in allProducts" :key="product.id">
                    <div class="card my-5 mx-5" style="width: 18rem;" >
                        <div class="crop">
                            <img :src="product.imageUrl" class="" height="270px" width="270px" :alt="product.name">
                        </div>
                        <div class="card-body ">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ currencyConverter(product.price) }}</p>
                            <p class="card-text">Stock left: {{ stockInterface(product.stock - carted) }}</p>
                            <div class="container d-flex justify-content-center">
                                <a href="#" class="btn btn-primary ml-0 mr-2" @click="addToCart(product.stock, product._id)">Add To Cart</a>
                                <!-- <a href="#" class="btn btn-primary mr-0 ml-2">Cart</a> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        data() {
            return {
                allProducts: [],
                carted: 0,
                amountProductsInCart: 0
            }
        },
        created() {
            this.getAllProducts()
        },
        methods: {
            getAllProducts() {
                axios.get('/products')
                .then(({data}) => {
                    console.log(data)
                    this.allProducts = data.products
                })
                .catch(err => {
                    console.log(err)
                })
            },
            currencyConverter(num) {
                return `Rp ${num.toLocaleString()},00`
            },
            stockInterface(num) {
                if (num == 1) {
                    return `${num} pc`
                } else {
                    return `${num} pcs`
                }
            },
            addToCart(stock, productId) {
                // console.log(productId)
                if (!localStorage.getItem('token')) {
                    swal({
                        title: "Unauthorized Access!",
                        text: "You need to login first. Click 'OK' to login. ",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((login) => {
                        if (login) {
                            this.$router.push('/login')
                        } else {
                        }
                    });
                } else {
                    if (stock - (this.carted + 1) < 0) {
                        swal(`Sorry we can not fulfill your request, unfortunately your buy request is more than our stock.`)
                    } else {
                        this.carted++
                        axios({
                            method: 'put',
                            url: `/cart/add/${productId}`,
                            headers: {
                                access_token: localStorage.getItem('token')
                            }
                        })
                        .then(({data}) => {
                            this.getAllProducts()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                }
            },
        }
    }
</script>

<style>

</style>
