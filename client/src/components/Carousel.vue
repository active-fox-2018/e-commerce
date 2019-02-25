<template>
  <q-page-container>
    <q-carousel
      style="height:600px"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      autoplay

    >
      <q-carousel-slide style="height:600px" :name="1" img-src="https://images.pexels.com/photos/573285/pexels-photo-573285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <q-carousel-slide style="height:600px" :name="2" img-src="https://images.pexels.com/photos/301977/pexels-photo-301977.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <q-carousel-slide style="height:600px" :name="3" img-src="https://images.pexels.com/photos/860538/pexels-photo-860538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      <q-carousel-slide style="height:600px" :name="4" img-src="https://images.pexels.com/photos/573243/pexels-photo-573243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
    </q-carousel>
  </q-page-container>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      slide: 1
    }
  }
}
</script>

<style>

</style>
