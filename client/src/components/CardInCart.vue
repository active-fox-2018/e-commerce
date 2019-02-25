<template>
  <v-card>
    <v-container mb-1 fluid grid-list-lg>
      <v-layout row justify-space-between>
        <v-flex xs2>
          <v-img
            :src="product.productId.image"
            aspect-ratio="1"
          />
        </v-flex>

        <v-flex xs8>
          <p class="title font-weight-medium">
            {{product.productId.name}}
          </p>
          <v-layout align-center>
            <v-btn fab dark small @click="reduce" color="primary">
              <v-icon dark>remove</v-icon>
            </v-btn>
            <v-flex xs3>
              <v-text-field v-model="count" class="inputPrice" type="number" min="1" disabled/>
            </v-flex>
            <v-btn fab dark small @click="add" color="indigo">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs2>
          <div
            v-if="product.productId.price"
            class="font-weight-medium"
          >IDR. {{product.productId.price.toLocaleString()}}</div>
        </v-flex>

      </v-layout>
    </v-container>

  </v-card>
</template>

<script>
import api from '@/api/server.js'

export default {
  props: ['product'],
  data() {
    return {
      count: 0
    }
  },
  mounted() {
    this.count = this.product.qty
  },
  methods: {
    add() {
      let obj = {
        productId: this.product.productId._id,
        qty: 1
      }
      api
        .put('/carts/addProducts', obj, { headers: {token: localStorage.getItem('token')} })
        .then(({data}) => {
          this.count++
          this.$emit('add', this.product.productId.price)
        })
        .catch(err => {
          console.log(err);
        })
    },
    reduce() {
      let obj = {
        productId: this.product.productId._id
      }
      if (this.count > 1) {
        api
          .put('/carts/reduceProducts', obj, { headers: {token: localStorage.getItem('token')} })
          .then(({data}) => {
            this.count--
            this.$emit('reduce', this.product.productId.price)
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  },
}
</script>

<style>

</style>
