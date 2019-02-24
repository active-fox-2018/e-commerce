<template>
  <v-container>
  <parallax class="mb-5"/>
  <carousels/>
  <boxitems class="mt-4"/>
  </v-container>

</template>

<script>
import carousels from '@/components/carousels.vue'
import parallax from '@/components/parallax.vue'
import boxitems from '@/components/items.vue'
export default {
  name: 'home',
  components: {
    carousels,
    parallax,
    boxitems
  },
  data () {
    return {

    }
  }
}
</script>
