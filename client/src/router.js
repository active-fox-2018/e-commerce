import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'details/:id',
          component: () => import('./components/DetailProduct.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('./views/Store.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import('./views/AdminTransaction.vue')
    },
    {
      path: '/user-transaction',
      name: 'userTransaction',
      component: () => import('./views/UserTransaction.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    }
  ]
})
