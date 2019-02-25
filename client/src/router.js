import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      component: () => import('./views/PublicHome.vue')
    },
    {
      path: '/user',
      component: () => import('./views/UserHome.vue'),
      meta: {
        requiresAuthUser: true
      },
      children: [
        {
          path: 'cart',
          component: () => import('./components/Cart.vue')
        },
        {
          path: 'transaction',
          component: () => import('./components/Transaction.vue')
        },
        {
          path: 'checkout',
          component: () => import('./components/Checkout.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('./views/AdminHome'),
      meta: {
        requiresAuthAdmin: true
      },
      children: [
        {
          path: 'products',
          component: () => import('./components/AdminPage/Product.vue')
        },
        {
          path: 'addProduct',
          component: () => import('./components/AdminPage/AddProduct.vue')
        },
        {
          path: 'transactions',
          component: () => import('./components/AdminPage/Transaction.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('./components/AdminPage/Login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('tokenAdmin')
  if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    if (store.state.adminToken) {
      next()
      return
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAuthUser)) {
    if (store.state.userToken) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
