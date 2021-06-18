// import '@fortawesome/fontawesome-free/css/all.min.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
// import './assets/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueLazyLoad from 'vue-lazyload';
import VueToastify from "vue-toastify";


Vue.use(VueLazyLoad)
Vue.use(VueToastify);
axios.defaults.withCredentials= true;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
