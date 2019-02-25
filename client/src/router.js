import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

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
      path: '/products',
      name: 'products',
      component: () => import('@/views/Products.vue'),
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('@/components/TestNested.vue'),
        }
      ]
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/Signup.vue'),
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/views/Signin.vue'),
    }
  ],
});
