import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import './styles/quasar.styl'
// import lang from 'quasar/lang/en.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import Quasar from 'quasar'
import store from './store.js'

Vue.use(Quasar, {
  config: {}
  // lang: lang
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
