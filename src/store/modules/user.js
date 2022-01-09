import cookies from '@/utils/auth.js'

const user = {
  namespaced: true,
  state: {
    token: cookies.getToken('token'),
    userInfo: {},
    locale: localStorage.getItem('locale') || 'zh'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOCALE: (state, locale) => {
      state.locale = locale
    }
  },
  actions: {
    // 登录
    login({
      commit
    }, userInfo) {
      const {
        userName,
        passWord
      } = userInfo
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', userName + passWord)
        cookies.setToken('token', userName + passWord, 60 * 60 * 24 * 7)
        resolve()
      })
    },
    // 获取用户信息
    getInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_USERINFO', {
          name: 'wpl',
          userId: 100
        })
        resolve()
      })
    },
    //  退出登录
    logout({
      commit,
      state,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USERINFO', {})
        cookies.removeToken('token')
        resolve()
      })
    }
  }
}
export default user
