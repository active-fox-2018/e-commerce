<template>
  <v-layout
      justify-center
      wrap
  >
    <v-flex class="text-xs-center">
      <h1>Transactions List</h1>
    </v-flex>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="transactions"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.user }}</td>
          <td class="text-xs-right">{{ props.item.status }}</td>
          <td class="text-xs-right">{{ props.item.invoice }}</td>
          <td class="text-xs-right">{{ props.item.created_at }}</td>
          <td class="text-xs-right">{{ props.item.updated_at }}</td>
        </template>
        <template slot="pageText" slot-scope="props">
          Lignes {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    axios({
      method: 'get',
      url: `${this.$store.state.serverUrl}/transactions`,
      headers : {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      let dataTransaction = []
      data.transactions.forEach(transaction => {
        dataTransaction.push({
          id: transaction._id,
          user: transaction.UserId.email,
          status: transaction.status,
          invoice: transaction.totalPrice.toLocaleString(),
          created_at: new Date(transaction.created_at).toString(),
          updated_at: new Date(transaction.updated_at).toString()
        })
      })
      this.transactions = dataTransaction
    })
    .catch(err => {
      console.log(err)
    })
  },
  data () {
    return {
      headers: [
        {
          text: 'TransactionId',
          align: 'left',
          value: 'id'
        },
        { text: 'User', value: 'user' },
        { text: 'Status', value: 'status' },
        { text: 'Total Invoice (IDR)', value: 'invoice' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' }
      ],
      transactions: []
    }
  }
}
</script>
