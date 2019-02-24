import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/users',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user" */ './views/userPage.vue'),
      children: [
        {
          path: 'transactions',
          name: 'transaction',
          component: () => import(/* webpackChunkName: "transaction" */ './views/transaction.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.type === 'admin') {
              next()
            } else {
              next({ name: 'user' })
            }
          }
        }
      ]
    },
    {
      path: '/items',
      name: 'items',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "item" */ './views/item.vue'),
      children: [
        {
          path: 'create',
          name: 'editItem',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "item" */ './views/createItem.vue'),
          beforeEnter: (to, from, next) => {
            if (store.state.type === 'admin') {
              next()
            } else {
              next({ name: 'items' })
            }
          }
        }
      ]
    },
    {
      path: '/shopping',
      name: 'shopping',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "item" */ './views/Cart.vue'),
      beforeEnter: (to, from, next) => {
        store.dispatch('getAllData')
        if (localStorage.getItem('token')) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
      
    }
  ]
})
