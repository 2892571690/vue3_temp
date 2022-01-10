const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  locale: state => state.user.locale,
  device: (state) => state.app.device,
  cachedViews: (state) => state.app.cachedViews
}
export default getters
