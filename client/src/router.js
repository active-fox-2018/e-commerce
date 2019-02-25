import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/users',
      component: () => import('@/views/Users'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/components/Login')
        }, {
          path: 'register',
          name: 'register',
          component: () => import('@/components/Register')
        }
      ]
    },
    {
      path: '/products/:id',
      name: 'details',
      component: () => import('@/views/Details')
    },
    {
      path: '/carts',
      name: 'cart',
      component: () => import('@/views/Carts')
    },
    {
      path: '/pendings',
      name: 'pending',
      component: () => import('@/views/Pendings')
    },
    {
      path: '/admins',
      name: 'admin',
      component: () => import('@/views/AdminHome'),
      children: [{
        path: 'add',
        name: 'addProduct',
        component: () => import('@/components/FormProduct')
      }, {
        path: 'edit',
        name: 'editProduct',
        component: () => import('@/components/FormProduct')
      }]
    },
  ]
})
