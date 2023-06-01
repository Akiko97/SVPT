import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/reference',
    name: 'reference',
    component: () => import('../views/Reference.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
