import axios from 'axios'
import qs from 'qs'
import cookies from './auth'
import store from '../store'
import { Message } from 'element-ui'

class Axios {
  // 实例化传参
  constructor (options = {}) {
    this.baseUrl = options.baseUrl || ''
    this.timeOut = options.timeOut || 2000
    this.headers = options.headers ? { 'Content-Type': 'application/json', ...options.headers } : { 'Content-Type': 'application/json' }

    // 存放请求
    this.pendingMap = new Map()

    this.init()
  }

  // 初始化axios
  init () {
    this.http = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeOut,
      headers: this.headers,
      // post put patch 请求参数序列化，（下面有单独写的，不想单独写可以把这个注释打开）
      // transformRequest: data => qs.stringify(data),
      // get 请求参数序列化,（下面有单独写的，不想单独写可以把这个注释打开）
      // paramsSerializer: params => qs.stringify(params, { indices: false })
    })
    this.setInterceptors()
  }

  // 拦截相应操作
  setInterceptors () {
    // 拦截
    this.http.interceptors.request.use(config => {
      // 是否需要设置 token,如果不需要在header里写isToken === false
      const isToken = (config.headers || {}).isToken === false
      if (cookies.getToken('token') && !isToken) {
        // 删除重复请求
        this.removePending(config)
        // 储存每个请求唯一值
        this.customOptions.repeatRequest && this.addPending(config)
        // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers.Authorization = cookies.getToken('token')
      }
      return config
    }, err => {
      return Promise.reject(err)
    })

    //  响应
    this.http.interceptors.response.use(response => {
      // 删除重复请求
      this.removePending(response.config)
      // 根据实际场景去配置
      console.log(response)
    }, err => {
      // 删除重复请求
      err.config && this.removePending(err.config)
      return Promise.reject(err)
    })
  }

  request (options, setting) {
    this.customOptions = Object.assign({
      repeatRequest: true // 是否开启取消重复请求, 默认为 true
    }, setting)
    return this.http.request(options)
  }

  // url:请求的地址
  // params:请求的参数
  // options:重写baseURL、timeout、headers,可以覆盖之前设定的
  // setting: 配置相关的开关(重复请求)
  get (url, params = {}, options = {}, setting = {}) {
    return this.request({
      method: 'get',
      url,
      params: { ...params }, // 这里让get请求中的body中数据拼接到url后面
      ...options,
      paramsSerializer: params => qs.stringify(params, { indices: false })
    }, setting)
  }

  post (url, data = {}, options = {}, setting = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      ...options,
      transformRequest: [$data => JSON.stringify($data)]
    }, setting)
  }

  delete (url, options = {}, setting = {}) {
    return this.request({
      method: 'delete',
      url,
      params: { ...options },
      ...options
    }, setting)
  }

  put (url, data, options = {}, setting = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      ...options,
      paramsSerializer: params => qs.stringify(params, { indices: false })
    }, setting)
  }

  formPost (url, data = {}, options = {}, setting = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      ...options,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, setting)
  }

  formPut (url, data, options = {}, setting = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      ...options,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, setting)
  }

  formPostTab (url, data = {}, options = {}, setting = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      ...options,
      headers: { 'Content-Type': 'multipart/form-data' }
    }, setting)
  }

  /**
   * 生成每个请求唯一的键
   * @param {*} config
   * @returns string
   */
  getPendingKey (config) {
    let {
      url,
      method,
      params,
      data
    } = config
    if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
  }

  /**
   * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
   * @param {*} config
   */
  addPending (config) {
    const pendingKey = this.getPendingKey(config)
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!this.pendingMap.has(pendingKey)) {
        this.pendingMap.set(pendingKey, cancel)
      }
    })
  }

  /**
   * 删除重复的请求
   * @param {*} config
   */
  removePending (config) {
    const pendingKey = this.getPendingKey(config)
    if (this.pendingMap.has(pendingKey)) {
      const cancelToken = this.pendingMap.get(pendingKey)
      cancelToken(pendingKey)
      this.pendingMap.delete(pendingKey)
    }
  }
}

export default Axios
