<template>
    <div>
        <div class="d-flex container my-5 mx-auto justify-content-center" style="text-align:center; margin: 0 auto;">
            <div class="mx-5">
                <router-link to="/signup">Sign Up</router-link>
            </div>
            <div class="mx-5">
                <router-link to="/login">Login</router-link>
            </div>
        </div>
        <form class="my-5 mx-5 container" v-on:submit.prevent="register">
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="text" class="form-control" id="inputEmail4" placeholder="e.g. 'barbara@example.com'" v-model="email">
                </div>
                <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password" v-model="password">
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Full Name</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="e.g. ( Barbara Ann )" v-model="full_name">
            </div>
            <!-- <div class="form-group">
                <label for="inputAddress2">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
                </div>
                <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip">
                </div>
            </div>
            <div class="form-group">
                <div clagss="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                    Check me out
                </label>
                </div>
            </div> -->
            <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
    </div>
</template>

<script>
    import axios from '@/api/server.js'

    export default {
        name: 'signup',
        props: {
            msg: String
        },
        data() {
            return {
                email: '',
                full_name: '',
                password: ''
            }
        },
        methods: {
            register() {
                axios.post('/users/register', {
                    email: this.email,
                    password: this.password,
                    full_name: this.full_name,
                    role: 'admin'
                })
                .then(({data}) => {
                    localStorage.setItem('token', data)
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }   
</script>

