<template>
  <div>
    <v-layout justify-space-around py-1 v-for="(product,index) in products" :key="index">
      <v-flex align-content-center>
        <v-card class="elevation-12">
          <v-toolbar color="cyan">
            <v-toolbar-title>{{product.name}}</v-toolbar-title>
          </v-toolbar>
          <v-img :src="product.image" alt max-width="250px"/>
          <v-card-text>name :{{product.name}}</v-card-text>
          <v-card-text>price :{{product.price}}</v-card-text>
          <v-card-text>amount :{{product.amount}}</v-card-text>
          <v-card-text>description :{{product.description}}</v-card-text>
          <v-dialog v-model='dialog' persistent max-width='600px'>
            <v-btn slot='activator' color='primary' dark>+ Update Data</v-btn>
            <editProductModal @close-dialog='closeDialog()' :products="products"  />
          </v-dialog>
          <v-btn color="error" @click="deleteProduct(product._id)">Delete Product</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import editProductModal from '@/components/editProductModal'
export default {
  data() {
    return {
      // products : this.$store.state.products
      dialog : false
    };
  },
  components : {
      editProductModal
  } ,
  computed: {
    products() {
      return this.$store.state.products;
    },
    ...mapState([
        {visible : 'modalVisible', modalComponent : 'modalComponent'}
    ])
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    updateProduct(id) {
      this.$store.dispatch("updateProduct", id);
    },
    ...mapMutations([
        'hideModal',
        'showModal'
    ]),
    closeDialog(){
        this.dialog = false
    }
  },
  
};
</script>

