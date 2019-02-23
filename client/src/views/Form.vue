<template>
    <div class="container">
        <login-form @set-user="sendUser" v-if="this.$route.name == 'login'"/>
        <register-form @set-user="sendUser" v-if="this.$route.name == 'register'"/>
        <add-product @new-product="newProduct" v-if="this.$route.name == 'sell'"/>
        <edit-product @edit-product="edit" v-if="this.$route.name == 'editProduct'"/>
    </div>
</template>

<script>
import loginForm from '@/components/Login.vue'
import registerForm from '@/components/registerForm.vue'
import addProduct from '@/components/addProduct.vue'
import editProduct from '@/components/editProduct.vue'

export default {
  name: 'formPage',
  components: {
    loginForm,
    registerForm,
    addProduct,
    editProduct
  },
  data () {
    return {
    }
  },
  methods: {
    sendUser (user) {
      this.$emit('set-user', user)
    },
    newProduct (product) {
      this.$emit('new-product', product)
    },
    edit (data) {
      this.$emit('edit-product', data)
    }
  }
}
</script>

<style>

</style>
