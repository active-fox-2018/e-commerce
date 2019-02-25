<template>
  <div class="q-pa-md" >
    <q-list v-for="(transaction, index) in transactionsUser" :key="index" style="margin-top: 7%" bordered padding>
      <q-item >
        <q-item-section>
          <h6> Transaction Id: <br> {{transaction._id}}</h6>
          <p><strong>Products: </strong></p>
          <li v-for="(product, index) in transaction.products" :key="index">
            <h7><strong>{{product.name}}</strong></h7>
            <br>
            <h7>IDR {{product.price}}</h7>
          </li>
          <q-item-label> Status: 
            <form v-if="transaction.status === 'On Process'">
              <select>
                <option disabled active>On Process</option>
                <option>Received</option>
              </select>
              <br>
              <q-btn @click="changeStatus(transaction._id)" flat color="primary" label="Change Status" />
            </form>
            <p v-else>Received</p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Transaction',
  data () {
    return {
      options: ['On Process', 'Received']
    }
  },
  created () {
    this.$store.dispatch('fetchTransactionUser')
  },
  computed: {
    ...mapState([
      'transactionsUser'
    ])
  },
  methods: {
    changeStatus(id) {
      this.$store.dispatch('changeTransactionStatus', id)
      this.$store.dispatch('fetchTransactionUser')
      this.$q.notify({icon: 'thumb_up', message: 'Your transaction status has been updated', position: 'top-right'})
    }
  }
}
</script>
