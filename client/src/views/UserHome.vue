
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
          <q-btn style="width:10%" dense flat round icon="menu" @click="right = !right" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" elevated fixed>
      <!-- drawer content -->
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered>
          <q-item  @click="backUserHome" clickable v-ripple>
            <q-item-section>{{userEmail}}</q-item-section>
            <q-item-section avatar>
              <q-icon name="account_circle" style="font-size: 3em;"/>
            </q-item-section>
          </q-item>
        </q-list>
       </div>
       <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered>
          <q-item  @click="goToCart" clickable v-ripple>
            <q-item-section>Cart</q-item-section>
            <q-item-section avatar>
              <q-icon color="black" name="shopping_cart" style="font-size: 3em;"/>
            </q-item-section>
          </q-item>

          <q-item @click="goToTransaction" clickable v-ripple>
            <q-item-section>Transactions</q-item-section>
            <q-item-section avatar>
              <q-avatar color="black" text-color="white" icon="history" />
            </q-item-section>
          </q-item>

          <q-separator inset />

          <q-item @click="signOutUser" clickable v-ripple>
            <q-item-section>Sign Out</q-item-section>
          </q-item>

        </q-list>
       </div>
    </q-drawer>
    <body>
      <div v-if="this.$router.currentRoute.path === '/user'">
        <Carousel ></Carousel>
        <br>
        <ProductDisplay></ProductDisplay>
      </div>
      <router-view></router-view>
    </body>

  </q-layout>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import SearchBar from '../components/SearchBar.vue'
import Logo from '../components/Logo.vue'
import ProductDisplay from '../components/ProductDisplay.vue'
import { mapState } from 'vuex'

export default {
  name: 'UserHome',
  data () {
    return {
      text: '',
      right: true
    }
  },
  computed: {
    ...mapState([
      'userEmail'
    ])
  },
  created () {
  },
  components: {
    Carousel,
    SearchBar,
    Logo,
    ProductDisplay
  },
  methods: {
    backUserHome () {
      this.$router.push({path: '/user'})
    },
    signOutUser () {
      this.$store.commit('logOutUser')
      this.$router.push({path: '/'})
    },
    goToCart () {
      this.$router.push({path: '/user/cart'})
    },
    goToTransaction() {
      this.$router.push({path: '/user/transaction'})
    }
  }
}
</script>
