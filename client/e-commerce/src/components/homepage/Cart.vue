<template>
    <div class="d-flex container">
        <div class="mt-5">
            <div class="card" style="max-width: 540px;" v-for="product in productsInMyCart" :key="product.id">
                <!-- {{product}} -->
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img :src="product.imageUrl" class="card-img" alt="No Image Available">
                    </div>
                    <div class="col-md-8 d-flex">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ currencyConverter(product.price) }} </p>
                            <!-- <p class="card-text"><small class="text-muted">{{ product.carted }}</small></p> -->
                        </div>
                        <div class="mr-3">
                            <a href="#" class="justify-align-center" @click="removeProduct(product._id)"><img class="mt-5" src="https://img.icons8.com/office/50/000000/minus.png" height="25"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-5 mx-3 px-20 my-5">
            Shop with us till you left your mortgage unpaid. <br>
            <br>
            <h1>Total Products In Cart: <br> 
                {{ currencyConverter(total) }}
            </h1>
            <div>
                <button id="checkout" class="my-3 btn btn-primary btn-lg btn-block">Checkout</button>
                <button id="clearCart" class="my-3 btn btn-primary btn-lg btn-block" @click="clearCart">Clear Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        created() {
            this.getCart()
        },
        watch: {
            // productsInMyCart(val) {
            //     this.getCart()
            // }
        },
        data() {
            return {
                productsInMyCart: [],
                productNames: [],
                uniqueProductsInCart: [],
                total: 0
            }
        },
        methods: {
            currencyConverter(num) {
                return `Rp ${num.toLocaleString()},00`
            },
            getCart() {
                if (!localStorage.getItem('token')) {
                    swal('You have not been login')
                    this.$router.push({
                        name: 'shop'
                    })
                } else {
                    axios.get('/cart', {
                        headers: {
                            access_token: localStorage.getItem('token')
                        }
                    })
                    .then(({data}) => {
                        for (let i = 0; i < data.length; i++) {
                            this.total += data[i].price
                        }
                        this.productsInMyCart = data
                        // console.log(this.productsInMyCart)
                        // data.forEach(p => {
                        //     // console.log(p)
                        //     let dataAndQuantity = {
                        //         name: p.name,
                        //         price: p.price,
                        //         image: p.imageUrl
                        //     }

                        //     console.log(dataAndQuantity)
                        // });
                        // this.uniqueProductsInCart = [...new Set(this.productsInMyCart)]
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            },
            removeProduct(id) {
                swal('You are deleting a product from your cart')
                let indexNya = 0
                this.productsInMyCart.forEach((p, index) => {
                    if (p._id == id) {
                        indexNya = index
                    }
                });
                this.productsInMyCart.splice(indexNya, 1)
                axios({
                    method: 'put',
                    url: `/cart/min/${id}`,
                    headers: {
                        access_token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                })
                .catch(err => {
                    swal(`Error ${err}`)
                })
            },
            clearCart() {
                swal('Products has been successfully in cart')
                // this.productsInMyCart = []
                // this.total = 0
                axios({
                    method: 'delete',
                    url: '/cart',
                    headers: {
                        access_token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                    // this.getCart()
                    this.$route.push({
                        name: 'shop'
                    })
                })
                .catch(err => {
                    swal(`Error ${err}`)
                })
            } 
        }
    }
</script>

<style>
    #clearCart {
        background: #e52d27;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #b31217, #e52d27);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #b31217, #e52d27); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    #checkout {
        background: #005C97;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>
