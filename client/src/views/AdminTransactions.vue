<template>
  <div class="container">
    <Transaction v-for="(transaction,index) in transactions" :key="transaction._id" :transaction="transaction" :index="index"></Transaction>
  </div>
</template>

<script>
import Transaction from '@/components/Transaction.vue'
export default {
  name: 'admin-transaction',
  components: {
    Transaction,
  },
  computed: {
    transactions() {
      return this.$store.state.allTransactions
    }
  },
}
</script>
