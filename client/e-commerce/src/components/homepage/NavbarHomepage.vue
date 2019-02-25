<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbarHomepage">
            <!-- <a class="navbar-brand" href="#">P-nues</a> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                        <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> -->
                    <li class="nav-item">
                        <!-- <a class="nav-link" href="#">Shop</a> -->
                        <router-link class="nav-link" to="/shop">Shop </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Menu
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item active mx-auto">
                        <!-- <a class="navbar-brand" href="#">P-nues</a> -->
                        <router-link to="/" class="navbar-brand">Supadono</router-link>
                    </li>
                </ul>
                <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> -->
                <router-link to="/cart" @amount-cart="amountToState" style="width: 10%; color: #fff;"><img src="https://img.icons8.com/plasticine/100/000000/shopping-cart.png" height="50px">{{ fAmount }}</router-link>
                <!-- <a href="#" class="nav-link">Login</a> -->
                <router-link to="/login" class="nav-link">Login</router-link>
                <!-- <router-view></router-view> -->
                <a href="#"><img src="https://img.icons8.com/ultraviolet/40/000000/gender-neutral-user.png" height="20px"></a>
                <div class="nav-item active ml-2">
                    <a href="#" @click="logout">Logout</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        //kalo pake object gini berarti dia akan validasi dia akan terima props bernama msg dengan bentuk string, ga ada pun rapopo
        props: {
            msg: String,
            cartAmount: Number,
        },
        data() {
            return {
                amountInCart: 0
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('token')
                swal('Signing Out...')
                this.$router.push({
                    name: '/'
                })
            },
            amountToState(payload) {
                this.amountInCart = payload
            }
        },
        computed: {
            fAmount() {
                return this.cartAmount
            }
        }
    }
</script>

<style>
    .navbar-nav {
        width: 100%;
        text-align: center;
        /* > li {
            float: none;
            display: inline-block;
        }; */
    }
    .bg-light {
        /* background-color: rgb(3, 5, 56) !important; */
        background: #ADD100;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #7B920A, #ADD100);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #7B920A, #ADD100); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        /* color: #fff !important; */
    }

    #navbarHomepage .nav-link {
        color: #fff;
    }

    .navbar-light .navbar-brand {
        color: #fff;
    }
</style>

