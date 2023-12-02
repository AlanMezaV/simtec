import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Alumnos from '../views/Alumnos.vue'
import Maestros from '../views/Maestros.vue'
import Materias from '../views/Materias.vue'
import Grupos from '../views/Grupos.vue'
import TomaCarga from '../views/TomaCarga.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alumnos',
    name: 'alumnos',
    component: Alumnos
  },
  {
    path: '/maestros',
    name: 'maestros',
    component: Maestros
  },
  {
    path: '/materias',
    name: 'materias',
    component: Materias
  },
  {
    path: '/grupos',
    name: 'grupos',
    component: Grupos
  },
  {
    path: '/carga',
    name: 'carga',
    component: TomaCarga
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
