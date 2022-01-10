const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    locale: state => state.user.locale,
    permission_routes: state => state.permission.routes,
}
export default getters
