import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '',
        name:'allproduct',
        component: () => import('./components/AllProduct.vue')
      },{
        path: 'addproduct',
        name: 'addproduct',
        component: () => import('./components/AddProduct.vue')
      }, {
        path: 'editproduct',
        name: 'editproduct',
        component: () => import('./components/EditProduct.vue')
      }, {
        path: 'productdetails',
        name: 'productdetails',
        component: () => import('./components/ProductDetails.vue')
      }, {
        path: 'cart',
        name: 'cart',
        component: () => import('./components/Cart.vue')
      }, {
        path: 'checkout',
        name: 'checkout',
        component: () => import('./components/Checkout.vue')
      }, {
        path: 'transactions',
        name: 'transactions',
        component: () => import('./components/Transactions.vue')
      }, {
        path: 'alltransactions',
        name: 'alltransactions',
        component: () => import('./components/AllTransactions.vue')
      }], 
    },
    {
      path: '/authpage',
      name: 'authpage',
      component: () => import('./views/Authpage.vue'),
      children: [
        {
          path: '',
          redirect: 'NotFound'
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./components/Register.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./components/Login.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./components/NotFound.vue')
    },
  ]
})
