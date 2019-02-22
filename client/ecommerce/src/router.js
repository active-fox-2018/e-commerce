import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import Product from "@/pages/product.vue";
import Cart from "@/pages/cart.vue"
import Transaction from '@/pages/transaction.vue'
import Admin from '@/pages/admin.vue'
import AdminProduct from '@/pages/admin-product.vue'
import AdminTransaction from '@/pages/admin-transaction.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'productHome',
      component: Product
    },
    {
      path: '/products',
      name: 'products',
      component: Product
    },
    {
      path: '/carts',
      name: 'carts',
      component: Cart
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transaction
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'products',
          name: 'admin-products',
          component: AdminProduct
        },
        {
          path: 'transactions',
          name: 'admin-transactions',
          component: AdminTransaction
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
