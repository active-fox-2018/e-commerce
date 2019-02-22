<template>
  <div class="row">
    <div class="col">
      <h1>Transaction History</h1>
      <div
        class="card"
        v-for="(transaction,transactionIndex) in transactionData"
        :key="transactionIndex"
      >
        <div class="card-header">{{transaction.date}}</div>
        <div class="card-body">
          <h5 class="card-title">By : {{transaction.user.name}} ({{transaction.user.email}})</h5>
          <div class="card-text">
            <div class="row">
              <div class="col-6">Product name</div>
              <div class="col">Amount</div>
              <div class="col">Price</div>
              <div class="col">Total</div>
            </div>
            <div class="row" v-for="(item,itemIndex) in transaction.items" :key="itemIndex">
              <div class="col-6">{{item.product.name}}</div>
              <div class="col">{{item.amount}}</div>
              <div class="col">{{item.product.price}}</div>
              <div class="col">{{item.amount*item.product.price}}</div>
            </div>
            <div class="row">
              <div class="col-6"></div>
              <div class="col"></div>
              <div class="col">Subtotal :</div>
              <div class="col">{{transaction.items.reduce((a,b)=>a+b.amount*b.product.price,0)}}</div>
            </div>
            <div class="row">
              <div
                class="col"
                v-if="transaction.status=='unpaid' || !transaction.status"
              >Waiting for payment</div>
              <div class="col" v-if="transaction.status=='paid'">
                The customer has already completed the payment.
                <button
                  class="btn btn-primary"
                  @click="send(transaction._id)"
                >I have shipped the item to the customer</button>
              </div>
              <div
                class="col"
                v-if="transaction.status=='sent'"
              >Waiting for the customer to confirm payment</div>
              <div class="col" v-if="transaction.status=='finished'">Status : Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userRole"],
  created() {
    this.getTransactions();
  },
  data() {
    return {
      transactionData: []
    };
  },
  methods: {
    async getTransactions() {
      try {
        let transactionData = await axios({
          method: "GET",
          baseURL,
          url: "/api/transactions/all",
          headers: { token }
        });
        this.transactionData = transactionData.data;
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async send(transactionId) {
      try {
        let transactionData = await axios({
          method: "POST",
          baseURL,
          url: "/api/transactions/send/" + transactionId,
          headers: { token }
        });
        this.getTransactions();
      } catch (err) {
        this.$emit("display-error", err);
      }
    }
  }
};
</script>
