<template>
  <v-container>
    <v-layout row wrap>
      <v-flex 12 xs class="mb-4">
        <v-layout align-center>
          <v-flex xs3>
            <h2 class="text-xs-left">All Transactions</h2>
          </v-flex>
          <v-flex xs3>
            <v-btn large color="primary" @click.prevent="getAllTransactions">All</v-btn>
          </v-flex>
          <v-flex xs3>
            <v-btn large color="grey" @click.prevent="getCompletedTransaction">Completed</v-btn>
          </v-flex>

          <v-flex xs3>
            <v-btn large color="black white--text" @click.prevent="getIncompleteTransactions">On Delivery</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-for="(transaction, index) in transactions" :key="index">
        <v-card>
          <v-layout>
            <v-flex xs6 md4>
              <v-card-title primary-title>
                <div class="title">Transaction date: {{transaction.createdAt.split("T")[0]}}</div>
                <div class="subheading">Transaction owner: {{transaction.userId.username}}</div>
                <div
                  class="subheading red--text"
                  v-if="transaction.status!=='delivered'"
                >Status: {{transaction.status}}</div>
                <div
                  class="subheading green--text"
                  v-else
                >Status: Products are {{transaction.status}}</div>
              </v-card-title>
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
  name: "AllTransactions",
  data() {
    return {
      transactions: ""
    };
  },
  created() {
    this.getAllTransactions();
  },
  methods: {
    getAllTransactions() {
      server
        .get("/transactions", {
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
    getCompletedTransaction() {
      this.transactions = this.transactions.filter(
        transaction => transaction.status == "delivered"
      );
    },
    getIncompleteTransactions() {
      this.transactions = this.transactions.filter(
        transaction => transaction.status !== "delivered"
      );
    }
  }
};
</script>

<style>
</style>
