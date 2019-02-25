<template>
    <div>
        <div class="d-flex container my-5 mx-auto justify-content-center">
            <div class="mx-5">
                <router-link to="/signup">Sign Up</router-link>
            </div>
            <div class="mx-5">
                <router-link to="/login">Login</router-link>
            </div>
        </div>
        <div class="container vh-50 hw-50">
            <div id="form-login">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="text" class="form-control hw-50" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
            <!-- <div id="imgLogin">
                <img src="https://images.pexels.com/photos/697059/pexels-photo-697059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="20%" alt="">
            </div> -->
        </div>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        name: 'login',
        data() {
            return {
                password: '',
                email: ''
            }
        },
        methods: {
            login() {
                axios.post('/users/login', {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    swal(`Welcome ${data.user}`, "", "success");
                    localStorage.setItem('token', data.token)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

