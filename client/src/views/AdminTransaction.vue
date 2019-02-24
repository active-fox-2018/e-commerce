<template>
  <div>
    <hr>
    <div class="container">
      <div class="row">
        <div class="col">
          Waiting For Shipment
            <div class="row">
              <div class="col">
                <div v-for="(data, index) in transactions" :key="index">
                  <div v-if="data.status == 'paid'" class="row mb-3">
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
                      <button @click="confirmation(data._id, 'shipping')" class="buttonNav">Send Product</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="col">
          On Shipping
            <div class="row">
              <div class="col">
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

                  </div>
                </div>
              </div>
            </div>
        </div>

        <div class="col">
          Transaction Done
          <div class="row">
              <div class="col">
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

                  </div>
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

export default {
  data () {
    return {
      transactions: []
    }
  },
  methods: {
    getTransactions () {
      relicApi({
        url: '/transactions/admin',
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
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.getTransactions()
  }
}
</script>

<style>

</style>
