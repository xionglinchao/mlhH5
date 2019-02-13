// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from '@/runtime/router'
import store from '@/store'
import axios from 'axios'
import { DatetimePlugin, AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin } from 'vux'
import '../static/style.css'
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)

require('@/runtime')

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.getQueryString = function (name) {
  let params = []
  let search = [window.location.search.split('?')[1] || '', window.location.hash.split('?')[1] || ''].join('&')
  search.split('&').forEach(function (el, index) {
    if (el === '') return
    let d = el.split('=')
    params[d[0]] = decodeURIComponent(d[1])
  })
  search = null
  return name ? params[name] || null : params
}
Vue.prototype.setUrl = function (url) {
  // let baseUrl = '../../static/'
  // 确认后切换
  // let baseUrl = 'https://mx.cdn.k-ku.com/h5/24c9275c2497ab5b/static/'
  let baseUrl = 'https://meilihua.oss-cn-hangzhou.aliyuncs.com/'
  return baseUrl + url
}
Vue.prototype.showAlert = function (mes) {
  this.$vux.alert.show({
    title: '提示',
    content: mes,
    onShow () {},
    onHide () {}
  })
}
// 授权
Vue.prototype.onLogin = function () {
  let queryStr = window.location.href.split('#/')[1]
  let query = queryStr.split('?')[1]
  let queryUrl = queryStr.split('?')[0]
  if (!query) {
    if (queryUrl) {
      query = '?router=' + queryUrl + '&loadurl=' + window.location.href.split('?')[0]
    } else {
      query = '?loadurl=' + window.location.href.split('?')[0]
    }
  } else {
    if (queryUrl) {
      query = '?' + query + '&router=' + queryUrl + '&loadurl=' + window.location.href.split('?')[0]
    } else {
      query = '?' + query + '&loadurl=' + window.location.href.split('?')[0]
    }
  }
  let data = {
    redirect_uri: 'https://meilihua.06baobao.com/public/authorize.html' + query // 本地调试回调
  }
  axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: 'interface/Login/auth',
    method: 'POST',
    data: data
  }).then((response) => {
    if (response.code === 1) {
      console.log(response.data, 'response.data')
      window.location.replace(response.data)
    } else {
      Vue.prototype.showAlert(response.msg)
    }
  })
}
Vue.prototype.hideLoading = function () {
  this.$vux.loading.hide()
}
// 分享设置
Vue.prototype.setWechat = function (shareLink) {
  console.log(shareLink, '调用')
  let wx = window.wx
  wx.ready(function () {
    console.log('分享设置成功！')
    store.state.hasSetWechat = true
    wx.onMenuShareAppMessage({
      title: '美丽花亲子时光', // 分享标题
      desc: '', // 分享描述
      link: shareLink, // 分享链接
      imgUrl: 'https://meilihua.oss-cn-hangzhou.aliyuncs.com/program/images/home.png', // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function (res) {
        console.log(shareLink, '分享成功！')
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
    wx.onMenuShareTimeline({ // 分享朋友圈
      title: '美丽花亲子时光', // 分享标题
      link: shareLink,
      imgUrl: 'https://meilihua.oss-cn-hangzhou.aliyuncs.com/program/images/home.png', // 分享图标
      success: function (res) {
        console.log('分享到朋友圈成功')
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}
Vue.prototype.initWechatShare = function () {
  var that = this
  axios({
    url: 'interface/Login/getJssdk',
    method: 'POST',
    data: {
      apis: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'hideMenuItems'
      ],
      debug: false, // 开启调试
      beta: 1, // 开始beta版本
      url: window.location.href.split('#')[0]
      // url: 'http://h5.06baobao.com/#/'
    }
  }).then((response) => {
    if (response.code === 1 || response.code === '1') {
      response.data.jsApiList = response.data.jsApiList.split(',')
      console.log('设置分享', response)
      if (response.data.debug === 'false') {
        response.data.debug = false
      }
      window.wx.config(response.data)
      sessionStorage.setItem('hasSetShare', 1)
      let shareLink = 'http://h5.06baobao.com/#/'
      that.setWechat(shareLink)
    } else {
      console.log('code錯誤', response)
    }
  })
}
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    if (!sessionStorage.getItem('hasSetShare')) {
      Vue.prototype.initWechatShare()
      console.log(111111111, 'share111')
    }
    if (localStorage.getItem('bind') === '0' && to.path !== '/login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (Vue.prototype.getQueryString()['code']) {
    let userCode = Vue.prototype.getQueryString()['code']
    let data = {
      code: userCode
    }
    axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: 'interface/Login/userInfo',
      method: 'POST',
      data: data
    }).then((res) => {
      console.log('获取用户信息', res)
      if (res.code === 1) {
        localStorage.setItem('bind', res.data.bind)
        store.state.bind = localStorage.getItem('bind')
        localStorage.setItem('token', res.data.token)
        store.state.token = localStorage.getItem('token')
        // console.log('store.state.token', store.state.token)
        console.log(localStorage.getItem('bind'), '111111', store.state.bind, 'store.state.token', store.state.token, 'apppppppppppp')
        Vue.prototype.initWechatShare()
        console.log(2222222222, 'share222')
        if (res.data.bind === 0) {
          next({
            path: '/login'
          })
        } else {
          next()
        }
        // setTimeout(() => {
        //   store.commit('set_page_ready', true)
        // }, 200)
      } else {
        Vue.prototype.onLogin()
      }
    })
  } else {
    Vue.prototype.onLogin()
  }
})
require('@/runtime/tips.js')

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
