<template>
  <v-container>
    <v-layout row wrap>
      <h1>Your Transactions</h1>
      <v-flex xs12 v-for="(transaction, index) in transactions" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs6 md4>
              <v-card-title primary-title>
                <div class="title">Transaction date: {{transaction.createdAt.split("T")[0]}}</div>
                <div class="subheading">Payment: Rp {{transaction.finalPrice.toLocaleString()}}</div>
                <div
                  class="subheading red--text"
                  v-if="transaction.status!=='delivered'"
                >Status: {{transaction.status}}</div>
                <div class="subheading green--text" v-else>Status: Products are {{transaction.status}}</div>
              </v-card-title>
            </v-flex>
            <v-flex v-if="transaction.status!=='delivered'" xs3 md2 offset-md5 offset-xs3 mt-4>
              <v-btn
                color="primary"
                @click.prevent="confirmDelivery(transaction._id)"
              >confirm delivery</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import server from "@/api/server.js";

export default {
  name: "transactions",
  data() {
    return {
      transactions: ""
    };
  },
  created() {
    this.getMyTransactions();
  },
  methods: {
    getMyTransactions() {
      server
        .get("/transactions/user", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.transactions = data.data;
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    confirmDelivery(transactionId) {
      server
        .put(
          `/transactions/status/${transactionId}`,
          { status: "delivered" },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.getMyTransactions();
          console.log(data)
        })
        .catch(({ response }) => {
          console.error(response);
        });
    }
  }
};
</script>

<style>
</style>
