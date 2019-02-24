<template>
  <v-layout>
     <v-card>
        <v-card-title>
          <span class="headline">CREATE NEW ITEM</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 >
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="20"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field
                  v-model="stock"
                  label="stock"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <v-text-field
                  v-model="price"
                  label="price"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 >
                <input type="file" ref="myFiles" class="custom-file-input" id="customFile" @change="previewFiles" multiple>
                <v-img :src="imageUrl" alt="..." v-if="imageUrl"/>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-progress-circular
            v-if="start"
            :size="50"
            color="amber"
            indeterminate
          ></v-progress-circular>
          <v-btn color="blue darken-1" flat  @click.prevent="createItem">CREATE</v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      price: 0,
      stock: 0,
      files: '',
      imageUrl: '',
      start: false,
    }
  },
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    }
  }, 
  methods: {
    previewFiles() {
      this.files = this.$refs.myFiles.files
      this.imageUrl = URL.createObjectURL(this.files[0])
    },
    createItem () {
      this.start = true
      let formData = new FormData()
      formData.append('image', this.files[0])
      formData.append('name', this.name)
      formData.append('stock', this.stock)
      formData.append('price', this.price)
       this.value = 20
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/items`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: formData
      })
      .then(({data}) => {
        console.log(data)
        this.$router.push('/items')
        this.start = false
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
