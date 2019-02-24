<template>
  <div>
    <div v-if="!details" class="container" style="mt-4">
        <Looping-Card
          :products="searcedProducts"
          @add-cart="addCart"
          @show-details="showDetails">
        </Looping-Card>
    </div>
  </div>
</template>

<script>
import LoopingCard from '@/components/LoopingCard.vue'
export default {
  data () {
    return {
      details: false
    }
  },
  components: {
    LoopingCard
  },
  props: ['searcedProducts'],
  methods: {
    addCart (payload) {
      this.$emit('add-cart', payload)
    },
    showDetails () {
      this.details = true
      // this.$emit("show-details");
    },
    hideDetails () {
      this.details = false
    }
  }
}
</script>

<style>

</style>
