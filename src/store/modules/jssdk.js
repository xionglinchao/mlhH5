// JSSDK模块
import axios from 'axios'

const config = require('@/config/api').default
const jssdk = require('@/config/jssdk').default

const shareConfig = config.shareConfig.wechat

export default {
  state: {
    isLoaded: false
  },
  mutations: {
    // 设置开关
    set_jssdk_state (state, payload) {
      state.isLoaded = payload
    },
    // 设置分享场景
    set_jssdk_scene (state, scene) {
      if (!jssdk.hasOwnProperty(scene)) {
        throw new Error(`分享场景不存在`)
      }
      if (typeof window.wx === 'undefined') {
        throw new Error('微信jssdk未加载')
      }
      let options = Object.assign(jssdk.default, jssdk[scene])
      console.log(`切换分享场景为${scene}`, options)
      const wx = window.wx
      if (shareConfig.jsApiList.indexOf('onMenuShareTimeline') > -1) {
        wx.onMenuShareTimeline(options)
      }
      if (shareConfig.jsApiList.indexOf('onMenuShareAppMessage') > -1) {
        wx.onMenuShareAppMessage(options)
      }
    },
    // 设置自定义分享信息
    set_jssdk_custom (state, options) {
      if (typeof window.wx === 'undefined') {
        throw new Error('微信jssdk未加载')
      }
      console.log('设置自定义分享信息')
      const wx = window.wx
      if (shareConfig.jsApiList.indexOf('onMenuShareTimeline') > -1) {
        wx.onMenuShareTimeline(options)
      }
      if (shareConfig.jsApiList.indexOf('onMenuShareAppMessage') > -1) {
        wx.onMenuShareAppMessage(options)
      }
    }
  },
  actions: {
    // 获取jssdk配置项
    get_jssdk_config ({commit, state}) {
      return axios({
        url: 'wechat/jssdk',
        method: 'POST',
        data: {
          apis: shareConfig.jsApiList || [],
          debug: shareConfig.debug ? 1 : 0, // 开启调试
          beta: shareConfig.beta ? 1 : 0, // 开始beta版本
          url: window.location.href.split('#')[0] // 当前页面地址
        }
      }).then((resp) => {
        if (resp.error_code !== 'SUCCESS') {
          throw new Error(resp.reason)
        }
        return resp
      })
    }
  },
  getters: {}
}
