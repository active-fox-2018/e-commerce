<template>
    <div id="homepage">
        <NavbarHomepage :cart-amount="amount"/>
        <!-- <BodyHomepage/> -->
        <router-view @amount-cart="amountCart"/>
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
                amount : 0
            }
        },
        methods: {
            amountCart(payload) {
                this.amount = payload
            },
        },
    }
</script>
