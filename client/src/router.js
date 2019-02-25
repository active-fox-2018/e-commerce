import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import Product from './components/product.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // components : Home,
  routes: [
    {
      path: '/',
      name: '',
      component: () => import(/* webpackChunkName: "home" */ './views/Home'),
      children : [
        {
          path : 'product',
          name : 'product',
          component : () => import(/* webpackChunkName: "home" */ './components/product.vue')
        },{
          path : 'signup',
          name : 'signup',
          component : () => import(/* webpackChunkName: "signup" */ './components/signup.vue')
        },{
          path : 'login',
          name : 'login',
          component : () => import(/* webpackChunkName: "login" */ './components/login.vue')
        },{
          path : '',
          name : 'mainPage',
          component : () => import(/* webpackChunkName: "login" */  './components/mainPage.vue')
        },{
          path : 'dashboard',
          name : 'dashboard',
          component : () => import(/* webpackChunkName: "login" */ './components/adminDashboard.vue')
        },{
          path : 'search',
          name : 'search',
          component : () => import(/* webpackChunkName: "search" */ './components/searchPage.vue')
        }],    
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
