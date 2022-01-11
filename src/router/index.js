import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Layout from '@/layout'


// {
//   path: '/writing-demo',
//   component: Layout,
//   redirect: '/writing-demo/keep-alive',
//   /*
//     alwaysShow-> default:false; true:当有一个子元素时显示父级；false:当有一个子元素时,不显示父级
//     hidden-> default:false; true:侧边栏中隐藏当前标签，包括其children；
//   */
//   meta: { title: 'Writing Demo', icon: 'eye-open' },
//   alwaysShow: true,
//   hidden:false
//   children: [
//     {
//       path: 'keep-alive',
//       component: () => import('@/views/example/keep-alive'),
//       // name-> 路由跳转时的name;keep-alive缓存时的name,建议必写
//       name: 'KeepAlive',
//       //cachePage: 页面进入时缓存页面, default false
//       //leaveRmCachePage: 页面离开时删除缓存页面, default false
//        /*
//         meta属性介绍:
//          title：sideBar显示的名称
//          cachePage->default:false;true->页面初始加载会进行缓存;
//          leaveRmCachePage->default:false;true->页面离开后会移除本页面缓存
//          activeMenu：要选中那个侧边栏item,如列表页跳转到详情页(设置为hidden)，如果想要还选中高亮列表页可以设置activeMenu:"列表页的链接"
//        */
//       meta: { title: 'Keep-Alive', cachePage: true, leaveRmCachePage: false }
//     },
//     {
//       path: 'router-demo-f',
//       name: 'routerDemoF',
//       hidden: true,
//       component: () => import('@/views/example/keep-alive/RouterDemoF.vue'),
//       meta: { title: 'RouterDemo-F', activeMenu: '/writing-demo/keep-alive' }
//     }
//   ]
// },


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
      title: '首页',
      elSvgIcon: 'Fold',
    }
  }]
},
{
  path: '/user',
  component: Layout,
  redirect: '/user/user',
  children: [{
    path: '/user',
    name: 'User',
    component: () => import('@/views/User/index.vue'),
    //使用el svg图标时，首先使用elSvgIcon，同时使用elSvgIcon和图标
    meta: {
      title: '用户列表',
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
