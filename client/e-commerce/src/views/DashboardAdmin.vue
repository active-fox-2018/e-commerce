<template>
    <div>
        <NavbarAdmin :AllProducts="AllProducts" />
        <router-view @refresh-products="refresh" @new-product="addProduct" :AllProductsInLibs="AllProducts"/>
    </div>
</template>

<script>
    // import LoginForm from '@/components/admin/AdminLogin.vue' 
    import NavbarAdmin from '@/components/admin/NavbarAdmin.vue'
    // import AddProductForm from '@/components/admin/AddProductForm.vue'
    import axios from '@/api/server.js'

    export default {
        props: ['AllProducts'],
        components: {
            NavbarAdmin
        },
        methods: {
            addProduct(payload) {
                this.$emit('new-product', payload)
            },
            refresh() {
                this.$emit('refresh-products')
            }
        }
    }
</script>

<style>
    #admin-navbar {
        color: #fff;
    }
</style>
