import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

/**
 * 路由懒加载参考
 * 文档地址: `https://router.vuejs.org/zh-cn/advanced/lazy-loading.html`
 * 例子: `component: () => import('@/pages/HelloWorld')`
 */

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash', // 路由模式 hash 有锚点 history 无锚点,
  routes: require('@/config/router').default
})

// 路由前置检测
// router.beforeEach((to, from, next) => {
//   console.log('to', to)
//   let bindType = localStorage.getItem('bind') ? localStorage.getItem('bind') : 0
//   if (!bindType && to.name !== 'login') {
//     return next('login')
//   }
//   return next()
//   // 如果没有自定义授权, 则默认强制授权
//   // if (typeof to.meta.authorize === 'undefined') {
//   //   to.meta.authorize = true
//   // }

//   // // 如果不需要授权, 直接进页面
//   // if (!to.meta.authorize) {
//   //   return next()
//   // }

//   // store.dispatch('check_authorize').then(() => { // 授权成功后
//   //   next()
//   // }).catch(() => { // 未登录跳转授权地址
//   //   store.dispatch('redirect_authorize')
//   // })
// })

// 路由后置检测
router.afterEach((to, from) => {
  // 只有微信需要下面的函数
  // if (store.state.app.browser.wechat) {
  //   if (router.mode === 'hash' && store.state.jssdk.isLoaded) {
  //     return
  //   }
  //   if (typeof window.wx !== 'undefined') { // 如果在微信环境中, 防止报错
  //     const wx = window.wx
  //     store.dispatch('get_jssdk_config').then((resp) => {
  //       wx.config(resp.result)
  //       wx.ready(function () {
  //         store.commit('set_jssdk_state', true)
  //         wx.hideAllNonBaseMenuItem()
  //         wx.showMenuItems({
  //           menuList: [
  //             'menuItem:share:timeline', // 分享到朋友圈
  //             'menuItem:share:appMessage' // 分享给朋友
  //           ]
  //         })
  //         store.commit('set_jssdk_scene', 'default')
  //       })
  //     })
  //   }
  // }
})

export default router
