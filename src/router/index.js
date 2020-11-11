import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cobranza',
    name: 'Cobranza',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cobranza.vue')
  },
  {
    path: '/agregar-cliente',
    name: 'AgregarCliente',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgregarCliente.vue')
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inventario.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
