<template>
  <div class="container has-text-centered" style="margin-top: 1em;">
      <div v-if="loading">
        <Loading></Loading>
      </div>
      <div v-else
        class="columns is-vcentered"
        style="font-size: 16px !important; line-height: 24px !important;">
          <div class="column is-6" style="font-size: 16px !important;">
              <figure
                class="image is-4by3"
                style="font-size: 16px !important;">
              <!-- <figure class="image is-5by3" style="font-size: 16px !important;"> -->
                  <img
                    class="isBorder"
                    :src="product.image"
                    alt="Description">
                    <!-- src="https://picsum.photos/800/600/?random" -->
              </figure>
          </div>
          <div
            class="column is-5 is-offset-1"
            style="font-size: 16px !important; line-height: 24px !important;">
            <DetailCard></DetailCard>
          </div>
      </div>
  </div>
</template>

<script>
import DetailCard from '@/components/DetailCard.vue';
import Loading from '@/components/Loading.vue';

export default {
  name: 'product-detail',
  components: {
    DetailCard, Loading,
  },
  created() {
    this.$store.dispatch('getDetails', this.$route.params.id);
    // console.log(this.$route.params.id)
  },
  computed: {
    product() {
      return this.$store.state.productData;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>

</style>
