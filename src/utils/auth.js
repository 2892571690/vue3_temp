// 创建一个放封装cookies的文件，我这边起名cookies.js
import Cookies from 'js-cookie'

class Cookie {
  // let seconds = 60 * 60 * 24; // 60秒 * 60分钟 * 24小时(这是一天，控制cookies的保存时间，过后失效)
  expires (seconds = 60 * 60 * 24) {
    return new Date(new Date() * 1 + seconds * 1000)// 用当前时间+设置的时间=未来到期的时间。然后把时间变成毫秒单位
  }

  // 获取cookies里面的值，跟session是一样的
  getToken (TokenKey) {
    return Cookies.get(TokenKey)
  }

  // 设置cookies里面的值，跟session是一样的
  setToken (TokenKey, token, seconds) {
    return Cookies.set(TokenKey, token, {
      expires: this.expires(seconds)
    })
  }

  // 删除cookies里面的值，跟session是一样的
  removeToken (TokenKey) {
    return Cookies.remove(TokenKey)
  }
}

export default new Cookie()
