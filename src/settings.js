const setting = {
  /*页面布局相关*/
  //侧栏或导航栏显示标题
  title: '泽辰开发中心',
  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏中显示徽标
   */
  sidebarLogo: true,
  /**
   * @type {boolean} true | false
   * @description 是否在导航栏中显示标题
   */
  showNavbarTitle: false,
  /**
   * @type {boolean} true | false
   * @description 是否显示下拉列表
   */
  ShowDropDown: true,
  /**
   * @type {boolean} true | false
   * @description 是否展示面包屑
   */
  showHamburger: true,
  /**
   * @type {boolean} true | false
   * @description 是否在右侧面板中显示设置
   */
  showLeftMenu: true,
  /**
   * @type {boolean} true | false
   * @description 是否显示TagsView
   */
  showTagsView: true,
  /**
   * @description TagsView显示编号
   */
  tagsViewNum: 6,
  /**
   * @type {boolean} true | false
   * @description 是否显示顶部导航栏
   */
  showTopNavbar: true,
  /* 网页动画相关*/
  /**
   * @type {boolean} true | false
   * @description 是否需要主要区域的动画
   */
  mainNeedAnimation: true,
  /**
   * @type {boolean} true | false
   * @description 是否使用nprogress
   */
  isNeedNprogress: true,

  /*页面登录或其他*/
  /**
   * @type {boolean} true | false
   * @description 是否需要登录
   */
  isNeedLogin: true,
  /**
   * @type {string} 'roles' | 'code'
   */
  permissionMode: 'roles',
  /**
   * @type {boolean} true | false
   * @description 是否打开prod mock
   */
  openProdMock: true,
  /**
   * @type {string | array} 'dev' | ['prod','test','dev'] according to the .env file props of VITE_APP_ENV
   * @description 需要显示错误日志组件。
   *默认值仅在生产环境中使用
   *如果您还想在dev中使用它，您可以通过['dev'，'test']
   */
  errorLog: ['prod'],
  /*
   * 表高度（100VH-窗口高度）
   * */
  delWindowHeight: '210px',
  /*
   * isNeedLoginis设置为false时设置开发令牌
   * */
  tmpToken: 'tmp_token',

  /*
   * vite.config.js base config
   * such as
   * */
  viteBasePath: '/vue3-admin-template/'
}

export default setting
