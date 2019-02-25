<template>
    <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Edit Product</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text v-for="(product,index) in products" :key="index">
                <form v-on:submit.prevent="" enctype="multipart/form-data">
                <v-text-field prepend-icon="create" value="product._id" type="text" v-model="id">{{product.id}}</v-text-field>
                  <v-text-field prepend-icon="create" value="product.name" type="text" v-model="name"></v-text-field>
                  <v-text-field  prepend-icon="attach_money" value="product.price" label="Price" type="number" v-model="price"></v-text-field>
                  <v-text-field  prepend-icon="fullscreen" value="product.amount"  label="Amount" type="number" v-model="amount"></v-text-field>
                  <v-text-field  prepend-icon="add_comment" value="product.description" label="Description" type="text" v-model="description"></v-text-field>
                  <input  prepend-icon="attach_file"  label="File Image" type="file" @change="uploadImage">
                </form>
                <v-btn color="blue darken-1" flat @click="$emit('close-dialog')">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="$emit('add-task', {name, price, amount, description})">Add</v-btn>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    name : 'editProductModal',
    props: ['products'],
    data : function(){
        return {
            id : products._id,
            name : products.name,
            price : products.price,
            amount : products.amount,
            description : products.description,
            image : ''
        }
    },
    methods : {
        uploadImage: function(e){
            console.log('ini dah masuk')
            this.image = e.target.files[0]
        },
        editProduct: function () {
            console.log('submit sukses')
            let formData = new FormData
            let objData = {
                name : this.name,
                price : this.price,
                amount : this.amount,
                description : this.description
            }

            formData.append('image',this.image)
            formData.append('data',JSON.stringify(objData))
            
            let depayload = {
              id : this.id,
              data : formData
            }
            
            //ini nanti jadi dispatch edit product
            this.$store.dispatch('editProduct', depayload)
            
            
        }
    }
}
</script>

