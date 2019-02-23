<template>
  <div>
    <hr>
    <div class="container mt-2">
      <ul class="list-group list-group-horizontal">
        <li @click="changeMenu('confirm')" class="list-group-item">Confirm Payment</li>
        <li @click="changeMenu('shipping')" class="list-group-item">On Shipping</li>
        <li @click="changeMenu('received')" class="list-group-item">Products Received</li>
      </ul>
      <hr>

      <div v-if="menu == 'confirm'">
        <!-- {{transactions}} -->
        <!-- {{transactions[0].productId}} -->
        <h3>Confirm Payment</h3>
        <div class="container">
          <div v-for="(data, index) in transactions" :key="index">
            <div v-if="data.status == 'payment' || data.status == 'paid'" class="row mb-3">
              <div class="col"><img :src="data.productId.img" alt="" style="width:100px; height:80px;"></div>
              <div class="col">
                <div class="d-flex align-items-start">
                  <div>
                      <h5>{{data.productId.name}}</h5>
                      <p>{{data.productId.category}}</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <button v-if="data.status == 'payment'" @click="confirmation(data._id, 'paid')" class="buttonCo">Confirm Payment</button>
                <h3 v-else-if="data.status == 'paid'" > Waiting for Shipment</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="menu == 'shipping'">
        <h3>Products On Shipping</h3>
        <div class="container">
          <div v-for="(data, index) in transactions" :key="index">
            <div v-if="data.status == 'shipping'" class="row mb-3">
              <div class="col"><img :src="data.productId.img" alt="" style="width:100px; height:80px;"></div>
              <div class="col">
                <div class="d-flex align-items-start">
                  <div>
                      <h5>{{data.productId.name}}</h5>
                      <p>{{data.productId.category}}</p>
                  </div>
                </div>
              </div>
              <div class="col">
                <button @click="confirmation(data._id, 'received')" class="buttonCo">Product Received</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="menu == 'received'">
        <h3>Transaction Complete</h3>
        <div class="container">
          <div v-for="(data, index) in transactions" :key="index">
            <div v-if="data.status == 'received'" class="row mb-3">
              <div class="col"><img :src="data.productId.img" alt="" style="width:100px; height:80px;"></div>
              <div class="col">
                <div class="d-flex align-items-start">
                  <div>
                      <h5>{{data.productId.name}}</h5>
                      <p>{{data.productId.category}}</p>
                  </div>
                </div>
              </div>
              <div class="col">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import relicApi from '@/api/index'
import { patch } from 'semver'

export default {
  data () {
    return {
      orders: [],
      menu: 'confirm',
      transactions: []
    }
  },
  methods: {
    changeMenu (input) {
      this.menu = input
    },
    confirmation (transacntionId, status) {
      relicApi({
        url: `/transactions/${transacntionId}`,
        method: 'patch',
        headers: {
          token: localStorage.token
        },
        data: {
          status: status
        }
      })
        .then(({ data }) => {
          let index = this.transactions.findIndex(el => {
            return el.productId._id === data.productId._id
          })
          if (index >= 0) {
            this.transactions.splice(index, 1, data)
          } else {
            this.transactions.unshift(data)
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    getTransaction () {
      console.log('get transacntion')
      relicApi({
        url: '/transactions',
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.transactions = data
        }).catch((err) => {
          console.log(err)
        })
    }

  },
  created () {
    this.getTransaction()
  }
}
</script>

<style>

</style>
