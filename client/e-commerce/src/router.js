import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/homepage.vue'
import Admin from '@/views/DashboardAdmin.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,//`http://localhost:3000`,
    routes: [{
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "bodyHome" */ './components/homepage/BodyHomepage.vue')
        },        
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "sign up" */ './components/homepage/LoginPage.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import(/* webpackChunkName: "login" */ './components/homepage/SignUpPage.vue')
        },
        {
          path: 'shop',
          name: 'shop',
          component: () => import(/* webpackChunkName: "Shop" */ './components/homepage/Shop.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import(/* webpackChunkName: "Cart" */ './components/homepage/Cart.vue')
        }
      ]
    }, 
    {
      path: '/admin',
      name: 'admin-home',
      component: Admin,
      children: [
        // {
        //   path: '/admin',
        //   name: 'admin',
        //   component: () => import(/* webpackChunkName: "adminPage" */ './components/admin/AdminLogin.vue')
        // },
        {
          path: 'add-product',
          name: 'addProduct',
          component: () => import(/* webpackChunkName: "form add product" */ './components/admin/AddProductForm.vue')
        },
        {
          path: 'products-lib',
          name: 'allProducts',
          component: () => import(/* webpackChunkName: "form add product" */ '@/components/admin/AllProducts.vue')
        },
        {
          path: 'edit-product/:id',
          name: 'editProduct',
          component: () => import(/* webpackChunkName: "form edit product" */ '@/components/admin/EditProduct.vue')
        }
      ]
    }
  ]
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })