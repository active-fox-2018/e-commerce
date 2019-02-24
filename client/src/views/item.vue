<template>
  <v-layout row
    wrap
  >
  <v-flex>
    <v-btn v-if="$store.state.type === 'admin'"><router-link to="/items/create" style="text-decoration:none"> Add New Item</router-link></v-btn>
  </v-flex>
  <v-flex>
    <router-view/>
  </v-flex>
  <v-flex>
    <itemsbox v-if="$store.state.items.length"/>
  </v-flex>
  </v-layout>
</template>

<script>
import itemsbox from '@/components/items.vue'
export default {
  components: {
    itemsbox
  }
}
</script>

<style>

</style>
