import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 一级路由
  {
    path: '/',
    component: () => import('@/views/Layout'),
    // 二级路由
    children: [{
      path: '/',
      component: () => import('@/views/home')
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
