<template>
    <div v-if="user" class="mx-5 my-3">
        <!-- HALAMAN ADMIN -->
        <div v-if="user.role === 'admin'" class="row">
            <div class="col">
                <h3 class="mb-2"><i style="color: grey" class="far fa-circle"></i> Must send <i style="color: grey"  class="far fa-circle"></i></h3>
                <div class="card mb-4" v-for="cart in allTrans" :key="cart._id">
                    <div class="card-body row" v-if="!cart.hasOwnProperty('recieved')" >
                        <div class="col">
                            <img class="detail-img" :src="cart.product.image" alt="product image">
                        </div>
                        <div class="col">
                            <div class="row">
                                <h3>
                                    {{ cart.product.name}}
                                </h3>
                            </div>
                            <div class="row text-left">
                                <h6>
                                    {{ cart.product.description }}
                                </h6>
                            </div>
                            <div class="row mt-3">
                                <span class="text-left" style="color: black; font-family: Karla, san-serif">
                                    <h6>Checkout time: </h6>
                                    {{ new Date(cart.checkoutDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.checkoutDate).toLocaleTimeString() }}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="col">
                <h3 class="mb-2"><i style="color: grey" class="far fa-circle"></i> Recieved <i style="color: grey"  class="far fa-circle"></i></h3>
                <div class="card mb-4" v-for="cart in allTrans" :key="cart._id">
                    <div class="card-body row"  v-if="cart.hasOwnProperty('recieved')">
                        <div class="col">
                            <img class="detail-img" :src="cart.product.image" alt="product image">
                        </div>
                        <div class="col">
                            <div class="row">
                                <h3>
                                    {{ cart.product.name}}
                                </h3>
                            </div>
                            <div class="row text-left">
                                <h6>
                                    {{ cart.product.description }}
                                </h6>
                            </div>
                            <div class="row mt-3">
                                <span class="text-left" style="color: black; font-family: Karla, san-serif">
                                    <h6>Checkout time: </h6>
                                    {{ new Date(cart.checkoutDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.checkoutDate).toLocaleTimeString() }}
                                </span>
                            </div>

                            <div class="row mt-3">
                                <span class="text-left" style="color: black; font-family: Karla, san-serif">
                                    <h6>Recieved: </h6>
                                    {{ new Date(cart.recieved).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.recieved).toLocaleTimeString() }}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <!-- HALAMAN CUSTOMER -->
        <div v-else class="row">

            <!-- ON PROCESS -->
            <div class="col">
                <h3 class="mb-2"><i style="color: grey" class="far fa-circle"></i> On process <i style="color: grey"  class="far fa-circle"></i></h3>
                 <div class="card mb-4" v-for="cart in myTrans" :key="cart._id">
                    <div class="card-body row">
                        <div class="col">
                            <img class="detail-img" :src="cart.product.image" alt="product image">
                        </div>
                        <div class="col">
                            <div class="row">
                                <h3>
                                    {{ cart.product.name}}
                                </h3>
                            </div>
                            <div class="row text-left">
                                <h6>
                                    {{ cart.product.description }}
                                </h6>
                            </div>
                            <div class="row mt-3">
                                <h6 class="text-left">
                                    Checkout time: <br> <br>
                                    {{ new Date(cart.checkoutDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.checkoutDate).toLocaleTimeString() }}
                                </h6>
                            </div>
                            <div class="row justify-content-end">
                                <button @click.prevent="recievedOne(cart._id)" style="right: 1vw; bottom: 0; background-color: #cfcfc4; color: black; position: absolute" type="button" class="btn btn-sm">Recieved</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- RECIEVED -->
            <div class="col">

                 <h3 class="mb-2"><i style="color: grey" class="far fa-circle"></i> Recieved <i style="color: grey"  class="far fa-circle"></i></h3>
                 <div class="card mb-4" v-for="cart in recieved" :key="cart._id">
                    <div class="card-body row">
                        <div class="col">
                            <img class="detail-img" :src="cart.product.image" alt="product image">
                        </div>
                        <div class="col">
                            <div class="row">
                                <h3>
                                    {{ cart.product.name}}
                                </h3>
                            </div>
                            <div class="row text-left">
                                <h6>
                                    {{ cart.product.description }}
                                </h6>
                            </div>
                            <div class="row mt-3">
                                <span class="text-left" style="color: black; font-family: Karla, san-serif">
                                    <h6>Checkout time: </h6>
                                    {{ new Date(cart.checkoutDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.checkoutDate).toLocaleTimeString() }}
                                </span>
                            </div>

                            <div class="row mt-3">
                                <span class="text-left" style="color: black; font-family: Karla, san-serif">
                                    <h6>Recieved: </h6>
                                    {{ new Date(cart.recieved).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }} <br>
                                    {{ new Date(cart.recieved).toLocaleTimeString() }}
                                </span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import server from '@/server/local.js'
import alertify from 'alertifyjs'

export default {
  name: 'profile',
  props: ['user'],
  data () {
    return {
      allTrans: [],
      myTrans: [],
      recieved: []
    }
  },
  methods: {
    getTrans () {
      server({
        method: 'get',
        url: '/carts/history',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.allTrans = data
          if (this.user.role !== 'admin') {
            this.myTrans = this.allTrans.filter(el => {
              return (String(el.user._id) === String(this.user._id) && !el.hasOwnProperty('recieved'))
            })
            this.recieved = this.allTrans.filter(el => {
              return String(el.user._id) === String(this.user._id) && el.hasOwnProperty('recieved')
            })
          }
        })
        .catch(err => {
          if (err.response.data) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    recievedOne (id) {
      server({
        method: 'put',
        url: `/carts/${id}/recieved`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.getTrans()
        })
        .catch(err => {
          if (err.response.data) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    }
  },
  created () {
    if (this.user) {
      this.getTrans()
    }
  }
}
</script>

<style>

</style>
