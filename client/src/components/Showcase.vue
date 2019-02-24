<template>
  <div>
    <div class="card bg-dark text-white container" style="height:500px; margin-top:20px;">
      <img src="https://images4.alphacoders.com/715/thumb-1920-715075.png" class="card-img" style="height:500px;">
      <div class="card-img-overlay">
        <div class="text">
          <h5 class="card-title">JAHSGDHJAGSDHJGASJHGDHJASGHJ</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
          </p>
        </div>
      </div>
    </div>
    <div v-if="!details" class="container" style="mt-4">
      <Looping-Card
          :products="products"
          @add-cart="addCart"
          @show-details="showDetails"></Looping-Card>
    </div>
  </div>
</template>

<script>
import LoopingCard from '@/components/LoopingCard.vue'
export default {
  components: {
    LoopingCard
  },
  props: ['products', 'details'],
  methods: {
    addCart (payload) {
      this.$emit('add-cart', payload)
    },
    showDetails () {
      this.$emit('show-details')
    }
  }
}
</script>

<style>
.card {
  padding: 0;
  border: none;
  border-radius: none;
}
.text {
  margin-top: 200px;
}
.showcase {
  margin-top: 30px;
}

.card-img-overlay:hover {
  background: rgba(0, 0, 0, 0.555);
}
</style>
