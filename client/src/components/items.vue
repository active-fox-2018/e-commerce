<template>
  <v-container fluid>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-layout row wrap>
      <boxItem  v-for="item in $store.state.items" :key="item._id"
         :item='item' @wakeSnackbar="wakeSnackBar"
      />
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import boxItem from '@/components/boxItem.vue'
export default {
  name: 'itemsbox',
  components: {
    boxItem
  },
  data() {
    return {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: ''
    }
  },
  methods: {
    wakeSnackBar(payload) {
      this.snackbar = true
      this.text = payload
    }
  }
}
</script>

<style>

</style>
