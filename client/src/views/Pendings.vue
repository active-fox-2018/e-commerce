<template>
  <v-container>
    <v-layout>
      <v-flex xs-12>
        <v-card>
          <v-tabs v-model="active" color="grey lighten-1" slider-color="primary">
            <v-tab v-for="(tab, i) in tabs" :key="i" ripple>{{ tab }}</v-tab>

            <v-tab-item>
              <v-container grid-list-lg>
                <v-layout column>
                  <TransactionDetail v-for="(transaction, i) in pendings" :key="i" :transaction="transaction" :status="'pending'" @recived="getTransactions"/>

                </v-layout>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container grid-list-lg>
                <v-layout column>
                  <TransactionDetail v-for="(transaction, i) in recived" :key="i" :transaction="transaction" :status="'recived'"/>

                </v-layout>
              </v-container>
            </v-tab-item>

          </v-tabs>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api/server.js'
import TransactionDetail from '@/components/TransactionDetail'

export default {
  components: {
    TransactionDetail
  },
  data() {
    return {
      tabs: [
        'sent',
        'accepted'
      ],
      active: null,
      transactions: [],
      pendings: [],
      recived: []
    }
  },
  mounted() {
    this.getTransactions()
  },
  methods: {
    getTransactions() {
      api
        .get(`/transactions/mytransactions`, { headers: { token: localStorage.getItem('token') } })
        .then(({data}) => {
          this.transactions = data
          this.getPending()
          this.getRecived()
        })
        .catch(err => {
          console.log(err);
        })
    },
    getPending() {
      this.pendings = this.transactions.filter(e => e.status === "pending")
    },
    getRecived() {
      this.recived = this.transactions.filter(e => e.status === "recived")
    }
  },
};
</script>

<style>
</style>
