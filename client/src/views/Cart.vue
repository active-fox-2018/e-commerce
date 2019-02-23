<template>
  <div>
    <div v-if="carts.length > 0">
        <div class="container">
            <div class="row">
                <div class="col-5">
                    <h5>Product</h5>
                </div>
                <div class="col-2">
                    <h5>Price</h5>
                </div>
                <div class="col-2">
                    <h5>Quantity</h5>
                </div>
                <div class="col-2">
                    <h5>Total</h5>
                </div>
                <div class="col-1">
                </div>
            </div>
            <hr>
            <!-- Loop Cart -->
              <div v-for="(cart, index) in carts" :key="index" class="row d-flex align-items-center mb-2">
                  <div class="col-5 d-flex align-items-start">
                      <img :src="cart.productId.img" style="width:150px">
                      <div class="d-flex align-items-start">
                          <div>
                              <h5>{{cart.productId.name}}</h5>
                              <p>{{cart.productId.category}}</p>
                          </div>
                      </div>
                  </div>
                  <div class="col-2">
                      <h5>Rp. {{cart.productId.price.toLocaleString()}}</h5>
                  </div>
                  <div class="col-2 align-items-center">
                      <div class="input-group " style="width:120px;height:60px;margin-left:20px;">
                          <div class="input-group-prepend" style="background:orange;border-top-left-radius:5px;border-bottom-left-radius:5px;">
                              <span class="input-group-text" style="font-weight:bold;">Qty</span>
                          </div>
                          <input type="number" class="form-control" placeholder="0" :value="cart.qty" style="height:60px;">
                      </div>
                  </div>
                  <div class="col-2">
                      <h5>Rp. {{cart.totalPrice.toLocaleString()}}</h5>
                  </div>
                  <div class="col-1">
                      <button @click="removeItem(cart._id)" class="buttonTransCard"><i style='font-size:24px' class='fas'>&#xf714;</i></button>
                  </div>
              </div>
            <!-- End Loop Cart -->
              <hr>
              <div >
                <div class="container d-flex justify-content-end">
                  <div class="row">
                    <div class="col">
                      <div class="row">
                        <h3>Sub Total: Rp. {{totalItemPrice.toLocaleString()}}</h3>
                      </div>
                      <div class="row d-flex justify-content-end">
                        <button @click="showAddressForm()" class="buttonCo">Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
            <div v-if="address" class="container" id="addressForm">
                <div class="row">
                    <!-- Address Form -->
                    <div class="col">
                        <addressForm
                            :fetchData="fetchData"
                            @shipping-cost="addShippingCost"></addressForm>
                    </div>
                    <!-- Address Form -->
                </div>
              <hr>
            </div>
        </div>

        <!-- Check Out Modal -->
        <checkOut
            :carts="carts"
            :totalItemPrice="totalItemPrice"
            :shippingCost="shippingCost"
            @empty-cart="emptyCart"></checkOut>
        <!-- Check Out Modal -->

    </div>
    <div v-else>
      <div class="container mt-4">
        <img src="https://www.wellcommshop.com/image/data/misc/emptycart.png" width="50%">
      </div>
    </div>
  </div>
</template>

<script>
import addressForm from '@/components/AddressForm.vue'
import checkOut from '@/components/CheckOut.vue'
import relicApi from '@/api/index'

export default {
  name: 'cart',
  components: {
    addressForm,
    checkOut
  },
  data () {
    return {
      address: false,
      fetchData: false,
      cart: true,
      shippingCost: null
    }
  },
  props: ['carts'],
  methods: {
    removeItem (cardId) {
      relicApi
        .delete(`/carts/${cardId}`, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.$emit('remove-cart-item', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    showAddressForm () {
      this.address = true
      this.fetchData = true
    },
    addShippingCost (payload) {
      this.shippingCost = payload
    },
    emptyCart () {
      this.$emit('empty-cart')
    }
  },
  computed: {
    totalItemPrice () {
      let subTotal = 0
      this.carts.forEach(el => {
        subTotal += el.totalPrice
      })
      return subTotal
    }
  }
}
</script>

<style>

</style>
