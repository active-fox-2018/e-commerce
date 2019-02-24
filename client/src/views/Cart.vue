<template>
<div>
    <div class="row" v-if="user && user.role !== 'admin'" >
      <div class="row mx-2" v-if="carts.length !== 0">

        <!-- MY CART -->
        <div class="col-7 ml-3 " >
          <b-card class="mt-2 " v-for="cart in carts" :key="cart._id">
            <h5 slot="header" class="text-left mt-1">
                <b-form-checkbox v-model="listCheckout" :value="cart" unchecked-value=""></b-form-checkbox>
                <i style="cursor: pointer;" @click="deleteCart(cart._id)" class="fas fa-times float-right"></i>
            </h5>
            <div class="row">
                <div class="col-2 float-left">
                    <img v-if="cart.product.image" :src="cart.product.image" :alt="cart.product.image" style="width: 100%; height: 100%">
                    <img v-else src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAACtra0wMDDz8/Oenp60tLQQEBDs7Oy7u7u/v7/Y2Nj6+vqEhIQWFhbPz8+Li4ttbW08PDzi4uLHx8dXV1empqZBQUFISEiAgIBycnJdXV2RkZE5OTkeHh4LCwsrKytPT08kJCRubm4bukFuAAADuklEQVR4nO3cbXOiMBQFYFG0KFCxWm2tVu3+//+4Qx1bt+XcBMiS3Mx5vjNzzyB5uQRHIyIiIiIiIiIiIiIiIiIiIiIiIiKKTpovZtOqLPdleZjO5sss9V2RQ9m83D0kv3xcqvnad20OLMv33+HurMaZ7xL7yKqTGO9qMtUaMn+ziHd1WfgutoP1s3W+2mnsu+C2ylb59GVcNoydZuel77qtHbrkq+19V26p3RP4Lw23sZj0CJgkU9/1G6XyDG/2x3cCk353sPbsO4Ls0jtg4BHbT4NNAh5SN04CBjzcFI4CJknuOwqwd5bww3eUZrmzgEly8B2m0YvDhEmIXY6ly4DJq+84DUzL0Uk1z7OiKNL1Zrs3bz7Cu4lrueDqR9cpfzUkDG/GECf7fcMdSVdiwvfhIxhI1c6aL5mJEUNrNUrLmQ26aCElDO1nKsz2W3yV9NN+Ga54K4+wUnGrgC9LkmKo2q0II6nY75V+3GEtTrewzkq+cIcTgvHJEzzyG2buOU5YDlO6JfiCwrj6wgmD6tiksEzjrIbv/m6Iym3BjdOT8VI87T8OULg1WKZ52hZG4QEKtzZFRZpHfPwDDyohXNFYzNo6EqK94dniWtwk/89Ft4Lm7ZXFtToSoiptJm0YMKix9Dh5uPdVpEW3JYMJg5oPe8ANrICb+63AiSbQnml7R5hw7rs0N4QlTWiNmo7wwvvkuzQ3hFtoM5cq8IQThrXF7woPpKE1ojqSXuZE8SMVX3WE1WnrRnyjGlo/uAuhyxbHLZQPpuh/ClNhmqipH0hNb8Th2yotpGmwpn1XUZiOuGt/CNfSG7Va0Cf3LMiTRAQBjWfA33xX2JN8/iLR35wxfkajfRQVXvhead8TGj9T0L4YNT2Du/COsrVjWsiEeBqxFdP5Wu2P4Gh0FvN96G+OjsWA2leiNfFjIeHkmxrihlD7JPFJOBG8U7+f/4THmRiaaiPpSMnRd2mO4EOW2tcxN/BwpvqW0w06UaR9u/vtAhLqX8ncgIDaWzJ3QEL9q+0bdCooloEU7pwiOYtQA9NhPCMp2jqp39V/Aw2M0L5s6gE0uuMZSkdVc8JIDq7VwKItmkUpbAVr+DMaS8vFzWz8bav1X8yIiIiI4lRkX9J7cbySqcGvhIP6/q4PeJTtwXdlrsCE8d9DJlSDCfWDs8XEd2WuMKF+TKgfE+rHhPoxoX5MqB/80sL8f3VKMKF+8KvKaJ7DfPv17n567xDDdxZERERERERERERERERERERERERERERERD/8BaxwJRZqIHjRAAAAAElFTkSuQmCC" alt="no image" class="mr-2" style="width: 50px; height: 60px">
                </div>
                <div class="col text-left ml-3">
                    <router-link :to="{name: 'product', params: { id: cart.product._id }}" style="color: black">
                    <h4 class="card-text"> {{ cart.product.name}} </h4>
                    </router-link>
                    <p> {{ cart.product.description}} </p>
                </div>
                <div class="col-2">
                    <p class="text-right">
                        IDR {{ cart.product.price.toLocaleString() }}
                    </p>
                </div>
            </div>

            <!-- MINUS AND PLUS QUANTITY -->
            <div class="row justify-content-end">
              <div class="input-group mb-3 col-3">
                  <span @click.prevent="minQty(cart._id, cart.qty)" class="input-group-text px-3 click-able"><i class="fas fa-minus mr-1 pr-1"></i></span>
                  <span class="input-group-text px-3" style="background-color: rgb(245, 245, 245)" > <h5> {{ cart.qty }} </h5></span>
                  <span @click.prevent="plusQty(cart._id, cart.qty)" class="input-group-text text-center px-3 click-able"><i class="fas fa-plus mr-3">  </i>  </span>
              </div>
            </div>

            <div slot="footer" class="text-left">
                <div class="row">
                    <div class="col">
                        Subtotal: <strong>IDR {{ cart.total.toLocaleString() }} </strong>
                    </div>
                    <div class="col-3 text-right">
                        <b-button variant="dark" @click.prevent="checkoutOne(cart._id)"> Checkout </b-button>
                    </div>
                </div>
            </div>
          </b-card>
        </div>
        <!-- //CHECKOUT -->
        <div class="col mr-3" >
          <b-card class="sticky-top mt-2 ">
            <div slot="header">
                <h5 class="text-left mt-1">
                    Checkout All
                </h5>
            </div>
            <div class="card-text text-left">
                <div class="row"  v-for="item in listCheckout" :key="item._id">
                    <h6 class="col">
                        {{ item.product.name }} :
                    </h6>
                    <h6 class="text-right col">
                        {{ item.qty}}
                    </h6>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                        <h5>
                        Total
                        </h5>
                    </div>
                    <div class="col">
                        <h5 class="text-right">
                            IDR {{ totalPrice.toLocaleString() }}
                        </h5>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <b-button @click.prevent="checkoutMany" variant="dark" class="float-right"> Checkout </b-button>
            </div>
          </b-card>

          <div class="row mt-2 " v-if="user">
            <div class="col"></div>
            <div class="col-6 mb-2">
                <b-button @click="deleteAllCarts" style="background-color: lightgrey; color: black; border-color: lightgrey" class="float-right ml-5"> <strong> Clear my cart</strong>  </b-button>
            </div>
          </div>

        </div>

      </div>
      <div v-else style="position: relative">
        <h1 style="position: absolute;background-color: black;color: white;left: 35%; right: 35%; top: 25%; bottom: 55% ">
            You have nothing on your cart
        </h1>
        <img src="@/assets/emptyData.svg">
      </div>

    </div>

    <div v-if="!user" style="position: relative">
        <h1 style="position: absolute;background-color: black;color: white;left: 35%; right: 35%; top: 25%; bottom: 55% ">
            Please login first
        </h1>
        <img src="@/assets/security.svg">
    </div>
    <div v-if="user && user.role === 'admin'" style="position: relative">
      <h1 style="position: absolute;background-color: black;color: white;left: 35%; right: 35%; top: 25%; bottom: 55% ">
          Admin don't have cart
      </h1>
      <img src="@/assets/security.svg">
    </div>

</div>
</template>

<script>
import server from '@/server/local.js'
import alertify from 'alertifyjs'

export default {
  name: 'CartPage',
  props: ['user'],
  data () {
    return {
      carts: [],
      listCheckout: [],
      totalPrice: 0
    }
  },
  methods: {
    getCart () {
      server({
        method: 'get',
        url: '/carts',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = data
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    deleteCart (id) {
      server({
        method: 'delete',
        url: `/carts/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = this.carts.filter(el => {
            return String(el._id) !== String(id)
          })
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    deleteAllCarts () {
      server({
        method: 'delete',
        url: `/carts`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.carts = []
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooops, something went wrong!`)
            console.log(err.response)
          }
        })
    },
    getTotal () {
      let temp = 0
      this.listCheckout.forEach(e => {
        temp += e.total
      })
      this.totalPrice = temp
    },
    checkoutMany () {
      if (this.listCheckout.length === 0) {
        alertify.error(`You don't have anything on your checkout list!`)
      } else {
        this.listCheckout.forEach(el => {
          this.checkoutOne(el._id)
        })

        // CHECKOUT MANY DI SERVER G BISA :(
        // server({
        //   method: 'put',
        //   url: '/carts',
        //   data: {
        //     carts: this.listCheckout
        //   },
        //   headers: {
        //     token: localStorage.token
        //   }
        // })
        //   .then(({ data }) => {
        this.$router.push({ name: 'profile', params: { id: this.user._id } })
        //   })
        //   .catch(err => {
        //     console.log(err.response)
        //     alertify.error(`Oopss something went wrong`)
        //   })
      }
    },
    checkoutOne (id) {
      server({
        method: 'put',
        url: `/carts/${id}/checkout`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.getCart()
          this.$emit('checkout')
        })
        .catch(err => {
          alertify.error(`Oopss something went wrong!`)
          console.log(err.response)
        })
    },
    minQty (id, qty) {
      if (qty === 1) {
        this.deleteCart(id)
      } else {
        this.updateQty(id, qty - 1)
      }
    },
    plusQty (id, qty) {
      this.updateQty(id, qty + 1)
    },
    updateQty (id, qty) {
      server({
        method: 'put',
        url: `/carts/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          qty
        }
      })
        .then(({ data }) => {
          this.getCart()
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            console.log(err.response)
            alertify.error('Oopss something went wrong!')
          }
        })
    }
  },
  created () {
    if (localStorage.token) {
      this.getCart()
    }
  },
  watch: {
    listCheckout () {
      this.getTotal()
    }
  }
}
</script>

<style>

</style>
