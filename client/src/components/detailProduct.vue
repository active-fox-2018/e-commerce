<template>
  <div v-if="product" class="ml-lg-4 mt-3 mr-lg-4">

    <div class="row">

      <!-- SLOT IMAGE -->
      <div class="col-lg-5">
        <img class="detail-img" :src="product.image" alt="product image" >
      </div>

      <!-- SLOT TEXT / CONTENT -->
      <div class="col ">

        <!-- PRODUCT NAME -->
        <div class="row ml-lg-2 ml-1">
          <div class="col text-left" style="padding:0; margin:0">
            <h1>
              {{ product.name }}
            </h1>
          </div>
          <div class="col-lg-2">
            <h2>
              <router-link  :to="{ name: 'editProduct', params: {id: product._id} }">
              <i class="click-able fas fa-edit mx-3"></i>
              </router-link>
              <i @click.prevent="deleteProduct" class="click-able fas fa-trash-alt"></i>
            </h2>
          </div>
        </div>

        <!-- PRODUCT CREATED AT -->
        <div class="row ml-lg-2 ml-1">
          <p>
            {{ new Date(product.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
        </div>
        <hr style="padding: 0; margin: 0.3rem">

        <!-- PRODUCT DESCRIPTION -->
        <div class="row ml-lg-2 mt-lg-2 ml-1">
          <h5 style="color: grey;">
            {{ product.description }}
          </h5>
        </div>

        <!-- PRODUCT QUANTITY -->
        <div class="row ml-lg-2 mt-lg-2 ml-1 justify-content-end mr-lg-2">
          <h5>
            Qty: {{ product.qty }}
          </h5>
        </div>
        <hr style="padding: 0; margin: 0.3rem">

        <!-- PRODUCT PRICE -->
        <div class="row ml-lg-2 mt-lg-2 ml-1">
          <h3 class="col justify-content-start text-left" style="font-family: Karla, san-serif; color: #4c4c4c;left: 0px;">
            IDR {{ product.price.toLocaleString() }}
          </h3>

          <div class="input-group mb-3 col-lg-4">
            <input v-model="amount" type="number" class="form-control" placeholder="amount">
            <div class="input-group-append">
              <span style="cursor: pointer" @click.prevent="addCart" class="input-group-text" ><i class="fas fa-shopping-basket"></i></span>
            </div>
          </div>

        </div>

        <div class="row ml-lg-2 mt-lg-2 ml-1">
          <h5>Check postal cost:</h5>
        </div>

        <div class="row ml-lg-2 mt-lg-2 ml-1" >
          <div class="form-group col">
            <label>Province</label>
            <b-form-select v-model="province" :options="optionsProv" />
          </div>
          <div class="form-group col">
            <label>City</label>
            <b-form-select v-model="city" :options="optionsCity" />
          </div>
          <div class="form-group col">
            <label>Courier</label>
            <b-form-select v-model="service" :options="optionsService" />
          </div>
           <div class="form-group col">
            <button @click.prevent="cek" class="mt-4 btn btn-secondary" style="background-color: rgb(247, 247, 249)">check</button>
          </div>
        </div>

        <div class="row ml-lg-2 mt-lg-2 ml-1" v-if="cost">
            <div class="col">
              <div class="row">
                <h5>{{ cost.name }} </h5>
              </div>
              <div class="row" >
                <div class="col card m-3 text-left" v-for="(op, i) in cost.costs" :key="i">
                  <h5 class="row mx-1 mt-1">{{ op.service }}</h5>
                  <p class="row mx-1">{{ op.description }}</p>
                  <h6 class="row mx-1">Price: {{ op.cost[0].value }}</h6>
                  <p class="row mx-1"> etd: {{ op.cost[0].etd }}</p>
                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
    <hr>
  </div>
</template>

<script>
import server from '@/server/local.js'
import alertify from 'alertifyjs'
import swal from 'sweetalert'

export default {
  name: 'detailProduct',
  props: ['user'],
  data () {
    return {
      product: null,
      amount: null,
      province: null,
      city: null,
      service: null,
      optionsProv: '',
      optionsCity: '',
      optionsService: [
        { value: 'jne', text: 'JNE' },
        { value: 'pos', text: 'POS' },
        { value: 'tiki', text: 'TIKI' }
      ],
      cost: null
    }
  },
  methods: {
    getProduct () {
      server({
        method: 'get',
        url: `/products/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.product = data
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
    addCart () {
      if (!this.amount || this.amount === 0 || isNaN(this.amount)) {
        alertify.error('Amount invalid')
      } else {
        if (!this.user) {
          alertify.error('Please login first')
        } else if (this.user.role === 'admin') {
          alertify.error('Only user can buy product')
        } else {
          server({
            method: 'post',
            url: `/carts/${this.product._id}`,
            headers: {
              token: localStorage.token
            },
            data: {
              qty: this.amount
            }
          })
            .then(({ data }) => {
              alertify.success('Success add to cart!')
            })
            .catch(err => {
              if (err.response.data.msg) {
                alertify.error(`${err.response.data.msg}`)
              } else {
                alertify.error(`Ooops, something went wrong!`)
              }
            })
        }
      }
    },
    deleteProduct () {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this product!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            server({
              method: 'delete',
              url: `/products/${this.product._id}`,
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                swal('Poof! Your product has been deleted!', {
                  icon: 'success'
                })
                this.$emit('delete-product', this.product._id)
                this.$router.push({ name: 'home' })
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
        })
    },
    getProv () {
      server({
        method: 'get',
        url: `/postal/province`,
      })
      .then(({ data }) => {
        this.optionsProv = data
      })
      .catch(err => {
        alertify.error(`Ooopss something went wrong!`)
        console.log(err.response)
      })
    },
    getCity (prov) {
      server({
        method: 'get',
        url: `postal/city?province=${prov}`
      })
        .then(({ data }) => {
          this.optionsCity = data
        })
        .catch(err => {
          alertify.error(`Ooopss something went wrong!`)
          console.log(err.response)
        })
    },
    cek () {
      server({
        method: 'post',
        url: '/postal',
        data: {
          destination: this.city,
          courier: this.service
        }
      })
      .then(({ data }) => {
        console.log(data[0])
        this.cost = data[0]
      })
      .catch(err => {
        alertify.error(`Ooopss something went wrong`)
        console.log(err.response)
      })
    }
  },
  created () {
    this.getProduct()
    this.getProv()
  },
  watch: {
    '$route' (to, from) {
      this.getProduct()
    },
    province (val) {
      this.getCity(val)
    }
  }
}
</script>

<style>

</style>
