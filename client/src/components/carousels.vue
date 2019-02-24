<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: 'carousels',
  data () {
    return {
      items: [
        {
          src: 'http://2.bp.blogspot.com/-_y_XUr_9OSQ/UfuvbRPPOqI/AAAAAAAAbjQ/Cgxo4DgX13E/s1600/ZARA+FALL+CAMPAIGN+13-WM01-1.jpg'
        },
        {
          src: 'http://www.10magazine.com/wp-content/uploads/2017/06/Emporio-Armani-AutumnWinter-2017-18-Advertising-Campaign-1.jpg'
        },
        {
          src: 'https://tomandlorenzo.com/wp-content/uploads/2018/07/Zara-Man-Fall-2018-Ad-Campaign-Fashion-Tom-Lorenzo-Site-1.jpg'
        },
        {
          src: 'http://img.over-blog-kiwi.com/1/48/40/59/20160705/ob_65463d_julia-nobis-for-christian-dior-fall-wi.jpg'
        }
      ]
    }
  }
}
</script>
