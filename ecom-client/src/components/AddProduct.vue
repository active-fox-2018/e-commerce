<template>
    <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Add Product</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <form v-on:submit.prevent="addProduct" enctype="multipart/form-data">
                  <v-text-field prepend-icon="create" label="product name" type="text" v-model="name"></v-text-field>
                  <v-text-field  prepend-icon="attach_money"  label="Price" type="number" v-model="price"></v-text-field>
                  <v-text-field  prepend-icon="fullscreen"  label="Amount" type="number" v-model="amount"></v-text-field>
                  <v-text-field  prepend-icon="add_comment"  label="Description" type="text" v-model="description"></v-text-field>
                  <input  prepend-icon="attach_file"  label="File Image" type="file" @change="uploadImage">
                  <v-btn type="submit" color="primary">Submit</v-btn>
                </form>
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
export default {
    data : function(){
        return {
            name : '',
            price : '',
            amount : '',
            description : '',
            image : ''
        }
    },
    methods : {
        uploadImage: function(e){
            console.log('ini dah masuk')
            this.image = e.target.files[0]
        },
        addProduct: function () {
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
            
            this.$store.dispatch('addProduct', formData)
            this.$emit('viewAllProduct', 'allProduct')
        }
    }
}
</script>

