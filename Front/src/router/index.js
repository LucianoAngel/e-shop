import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'InicioSesion',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/',
    name: 'Principal',
    component: Principal
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
    path: '/historial-de-venta',
    name: 'HistorialDeVenta',
    component: () => import(/* webpackChunkName: "about" */ '../views/historialDeVenta.vue')
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inventario.vue')
  },
  {
    path: '/gastos',
    name: 'Gastos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Gastos.vue')
  },
  {
    path: '/ingresos',
    name: 'Ingresos',
    component: () => import(/* webpackChunkName: "about" */ '../components/ingresos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
