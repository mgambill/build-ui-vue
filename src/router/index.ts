import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/select',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/loan',
      name: 'loan',
      // route level code-splitting
      // this generates a separate chunk (loan.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoanView.vue')
    },
    {
      path: '/select',
      name: 'select',
      // route level code-splitting
      // this generates a separate chunk (select.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SelectView.vue')
    }
  ]
})

export default router
