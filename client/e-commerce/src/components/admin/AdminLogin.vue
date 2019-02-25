<template>
    <div class="container">
        <h3 class="my-4">Admin Login Form</h3>
        <form class="mt-7" @submit.prevent="adminLogin">  
            <div class="form-group row my-5">
                <label for="inputEmail5" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail3" placeholder="Email" v-model="email">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword5" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword38" placeholder="Password" v-model="password">
                </div>
            </div>
            <div>
                <button class="btn btn-primary" type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            adminLogin() {
                axios.post('/admin/login', {
                    email: this.email,
                    password: this.password
                })
                .then(({data}) => {
                    console.log(data)
                    this.adminIsLogin = true
                    this.loginForm = true
                    localStorage.setItem('token', data.token)
                    this.$router.push({
                        name: 'addProduct'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            },
            // adminLogin() {
            //     this.$emit('admin-login', {
            //         email: this.email,
            //         password: this.password
            //     })
            // }
        }
    }
</script>

<style>

</style>
