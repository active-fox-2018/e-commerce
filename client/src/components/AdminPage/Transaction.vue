<template>
  <q-layout>
    <q-card v-for="(transaction, index) in transactionsAdmin.transactions" :key="index">
      <q-title>
        <h4>{{transaction.buyer.fullname}}</h4>
        <q-list >
          <q-item  v-for="(product, index) in transaction.products" :key="index">
            <q-item-section style="margin-left:5px" top thumbnail class="q-ml-none">
              <img :src="product.image" style="height:100px; width:100px">
            </q-item-section>
            <q-item-section v-ripple>
              <q-item-label overline>{{product.name}}</q-item-label>
              <q-item-label>{{product.price}}</q-item-label>
              <q-item-label></q-item-label>
            </q-item-section>
            <q-item-section v-ripple>
              <q-item-label overline>Status: {{transaction.status}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-title>
    </q-card>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TransactionAdmin',
  computed: {
    ...mapState ([
      'transactionsAdmin'
    ])
  }
}
</script>

<style>

</style>
