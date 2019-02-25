<template>
    <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      app
    >
        <v-list dense>
            
            <v-list-tile @click="current = 'helloWorld'">
            <v-list-tile-action>
                <v-icon>code</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Hello World!</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="current = 'login'">
            <v-list-tile-action>
                <v-icon>account_box</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Login</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            
            <v-list-tile @click="current = 'code'">
            <v-list-tile-action>
                <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="getAllProd">
            <v-list-tile-action>
                <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>All Product</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>  

            <v-list-tile @click="current = 'addProduct'">
            <v-list-tile-action>
                <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Add New Product</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>  
        </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <v-spacer></v-spacer>
      <v-toolbar-title>Aqua Regia</v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
          <HelloWorld v-if="current === 'helloWorld'" />
          <Login v-if="current === 'login'" />
          <div v-if="current == 'code'">
              <v-layout justify-center align-center>
                <v-flex text-xs-center>
                  <v-tooltip left>
                    <span>Source</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
          </div>
          <div>
          <Product/>
          </div>
            <AddProduct v-if="role == 'admin' && current == 'addProduct'" @viewAllProduct="goToPage($event)"  />
      </v-container>
    </v-content>
    <v-footer color="cyan" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Product from '@/components/Product'
import { mapState, mapActions } from 'vuex'
import AddProduct from '@/components/AddProduct'


export default {
    components: {
    HelloWorld,
    Login,
    Product,
    AddProduct
  },
    name : 'Sidebar',
    data () {
    return {
      //
      current : '',
      drawer: null,
      // role : ''
    }
  },
  methods : {
    ...mapActions([
      'showOrHideProductButton'
    ]),
    showPopupAdd(){
      this.showOrHideProductButton()
    },
    getAllProd(){
      this.current = 'allProduct'
      this.$store.dispatch('getAllProduct')
    },
    goToPage(pages) {
      this.current = pages
    }
  },
  computed : {
    ...mapState([
      'role'
    ])
  },
  props: {
    source: String
  }
  ,
}
</script>

