<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="width:650px; margin-right:50px;">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Order Review</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-5" style="text-align:left">
              Product name
            </div>
            <div class="col-1">
              Qty
            </div>
            <div class="col-3">
              Price
            </div>
            <div class="col-3">
              Sub Total
            </div>
          </div>
          <hr>

          <div v-for="(item, index) in carts" :key="index" class="row">
            <div class="col-5" style="text-align:left">
              {{item.productId.name}}
            </div>
            <div class="col-1">
              {{item.qty}}
            </div>
            <div class="col-3">
              Rp. {{item.productId.price.toLocaleString()}}
            </div>
            <div class="col-3">
              Rp. {{item.totalPrice.toLocaleString()}}
            </div>
          </div>
          <hr>
          <div class="row" style="margin-right:10px">
            <div class="col-9 d-flex justify-content-end">
              Sub Total:
            </div>
            <div class="col d-flex justify-content-end">
              Rp. {{totalItemPrice.toLocaleString()}}
            </div>
          </div>
          <div class="row" style="margin-right:10px">
            <div class="col-9 d-flex justify-content-end">
              Shipping Cost:
            </div>
            <div v-if="shippingCost" class="col d-flex justify-content-end">
              Rp. {{shippingCost.toLocaleString()}}
            </div>
            <div v-else-if="!shippingCost" class="col d-flex justify-content-end">
              Rp. 0
            </div>
          </div>

          <div class="row" style="margin-right:10px">
            <div class="col-9 d-flex justify-content-end">
              Grand Total:
            </div>
            <div class="col d-flex justify-content-end">
              Rp. {{grandTotal.toLocaleString()}}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="update()" type="button" class="btn btn-primary" data-dismiss="modal">Payment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import relicApi from '@/api/index'

export default {
  props: ['carts', 'totalItemPrice', 'shippingCost'],
  methods: {
    update () {
      relicApi({
        url: '/carts',
        method: 'put',
        data: {
          items: this.carts
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log('masuk then')
          console.log(data)
          this.$emit('empty-cart')
          this.$router.push('/user-transaction')
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    grandTotal () {
      let total = this.totalItemPrice + this.shippingCost
      return total
    }
  }
}
</script>

<style>

</style>
