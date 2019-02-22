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
          <h5 class="card-title">Purchase data</h5>
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
              <div class="col" v-if="transaction.status=='unpaid' || !transaction.status">
                Please complete the transaction by paying the requested amount.
                <button
                  class="btn btn-primary"
                  @click="pay(transaction._id)"
                >I have already paid</button>
              </div>
              <div class="col" v-if="transaction.status=='paid'">Your order is being processed</div>
              <div class="col" v-if="transaction.status=='sent'">
                The items is being sent
                <button
                  class="btn btn-primary"
                  @click="finish(transaction._id)"
                >I have received the item</button>
              </div>
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
          url: "/api/transactions",
          headers: { token }
        });
        this.transactionData = transactionData.data;
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async pay(transactionId) {
      try {
        let transactionData = await axios({
          method: "POST",
          baseURL,
          url: "/api/transactions/pay/" + transactionId,
          headers: { token }
        });
        this.getTransactions();
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async finish(transactionId) {
      try {
        let transactionData = await axios({
          method: "POST",
          baseURL,
          url: "/api/transactions/finish/" + transactionId,
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
