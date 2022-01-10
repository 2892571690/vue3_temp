import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import cookies from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 不需要token的白名单

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const hasToken = cookies.getToken('token')
    // 判断有没有token
    if (hasToken) {
        // 是否跳转登录页
        if (to.path === '/login') {
            // 已登录的话重定向到首页
            next({ path: '/' })
        } else {
            // 判断有没有用户信息
            if (!store.getters.userInfo.userId) {
                // 拉取用户信息
                store.dispatch('user/getInfo', { userName: 'wpl', userId: '001' }).then(() => {
                    // 获取路由
                    store.dispatch('permission/generateRoutes', 'admin').then(accessRoutes => {
                        for (const accessRoute of accessRoutes) {
                            router.addRoute(accessRoute)
                        }
                        next({
                            ...to,
                            replace: true
                        })
                    })
                })
            } else {
                next()
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
