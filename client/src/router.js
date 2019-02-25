import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import FormUpload from './views/FormUpload.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue'),
    },
    {
      path: '/products/:id',
      name: 'products',
      component: () => import('./views/ProductDetail.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/RegisterForm.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/LoginForm.vue'),
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import('./views/Cart.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/AdminDashboard.vue'),
      children: [
        {
          path: 'upload',
          // component: FormUpload,
          component: () => import('./views/FormUpload.vue'),
        },
        {
          path: 'transactions',
          component: () => import('./views/AdminTransactions.vue')
        }
      ],
    },
  ],
});
