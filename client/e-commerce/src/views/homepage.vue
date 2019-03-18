<template>
    <div id="homepage">
        <NavbarHomepage :login="isLogin" @change-login="changeIsLogin" />
        <!-- <BodyHomepage/> -->
        <router-view :loginStatus="isLogin" @change-login="changeIsLogin" />
    </div>
</template>

<script>
    import NavbarHomepage from '@/components/homepage/NavbarHomepage.vue'

    export default {
        name: 'navbar-homepage',
        components: {
           NavbarHomepage: NavbarHomepage,
        },
        data() {
            return {
                amount: 0,
                isLogin: false
            }
        },
        methods: {
            // amountCart(payload) {
            //     this.amount = payload
            // },
            changeIsLogin(status) {
                console.log(status)
                this.isLogin = status
            }
        },
    }
</script>
