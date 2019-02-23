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
          path: 'product/:id',
          name: 'product',
          component: () => import('./components/detailProduct.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Form.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Form.vue')
    },
    {
      path: '/sell',
      name: 'sell',
      component: () => import('./views/Form.vue')
    },
    {
      path: '/editProduct/:id',
      name: 'editProduct',
      component: () => import('./views/Form.vue')
    }
  ]
})
