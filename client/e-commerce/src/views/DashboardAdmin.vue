<template>
    <div>
        <NavbarAdmin :AllProducts="AllProducts" />
        <!-- <div>
            <LoginForm @admin-login="adminLogin"></LoginForm>
        </div> -->
        <!-- <div>
            <AddProductForm v-if="productForm"></AddProductForm>
        </div> -->
        <!-- login dll -->
        <router-view :AllProducts="AllProducts"/>
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
    }
</script>

<style>
    #admin-navbar {
        color: #fff;
    }
</style>
