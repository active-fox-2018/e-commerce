<template>
  <q-layout view="hHh lpR fFf">
     <q-header elevated class="bg-black text-white row justify-between">
      <q-toolbar>
        <div class="col-2">
          <Logo></Logo>
        </div>
        <div class="col-8">
          <SearchBar></SearchBar>
        </div>
        <div class="col-2 column items-end">
          <q-btn color="white" class="text-black" @click="showDialog = true" label="Sign In" />
        </div>
      </q-toolbar>
    </q-header>
    <body>
      <Carousel></Carousel>
      <br>
      <ProductDisplay></ProductDisplay>
    </body>

    <Dialog @changestatus="showDialog = false" :showDialog="showDialog" ></Dialog>
  </q-layout>

</template>

<script>
import Carousel from '../components/Carousel.vue'
import Logo from '../components/Logo.vue'
import SearchBar from '../components/SearchBar.vue'
import Dialog from '../components/Dialog.vue'
import ProductDisplay from '../components/ProductDisplay.vue'

export default {
  name: 'PublicHome',
  components: {
    Carousel,
    Logo,
    SearchBar,
    Dialog,
    ProductDisplay
  },
  data () {
    return {
      showDialog : false
    }
  },
  created () {
    if (localStorage.getItem('tokenUser')) {
      this.$router.push({path: '/user'})
    }
  }
}
</script>
