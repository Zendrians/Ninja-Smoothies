import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/addsmoothie',
    name: 'AddSmoothie',
    component: () => import('../views/AddSmoothie.vue')
  },
  {
    path: '/editsmoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: () => import('../views/EditSmoothie.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
