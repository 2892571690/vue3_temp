import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/Error/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/Error/401.vue')
  }
]

export const asyncRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/Home/index.vue'),
      //使用el svg图标时，首先使用elSvgIcon，同时使用elSvgIcon和图标
      meta: {
        title: 'Dashboard',
        elSvgIcon: 'Fold'
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: '/user',
      name: 'User',
      component: () => import('@/views/User/index.vue'),
      //使用el svg图标时，首先使用elSvgIcon，同时使用elSvgIcon和图标
      meta: {
        title: 'Dashboard',
        elSvgIcon: 'Fold'
      }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})

export default router
