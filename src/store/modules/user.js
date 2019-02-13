// 用户模块
import axios from 'axios'
import { getQueryString } from '@/runtime/tools'

const config = require('@/config/api').default

let ticket = JSON.parse(localStorage.getItem(`ticket_${config.clientId}`)) || {}

// 如果强制转换
for (let regexp in config.forceGrantType) {
  let isChecked = !!navigator.userAgent.match(new RegExp(regexp, 'i'))
  if (isChecked) {
    config.grantType = config.forceGrantType[regexp]
    break
  }
}

// 如果ticket过期, 则清空ticket
if ((ticket.expires_at && ticket.expires_at < parseInt(new Date().getTime() / 1000)) || ticket.grant_type !== config.grantType) {
  localStorage.removeItem(`ticket_${config.clientId}`)
  ticket = {}
}

export default {
  state: {
    // 登录凭证
    ticket: ticket,
    // 用户信息
    profile: {}
  },
  mutations: {
    // 设置登录凭证
    set_ticket (state, payload) {
      localStorage.setItem(`ticket_${config.clientId}`, JSON.stringify(payload))
      state.ticket = payload
    },
    // 设置用户信息
    set_user_profile (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    // 获取access_token
    get_access_token ({commit, state}) {
      let data = {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: config.grantType
      }

      if (config.grantType === 'authorization_code') { // 采用授权码登录
        // 检测是否有code
        let code = getQueryString('code')
        if (!code) {
          throw new Error('没有检测到code参数')
        }
        data.code = code
      } else if (config.grantType === 'temporary_auth') { // 采用临时凭证登录
        data.uuid = localStorage.getItem(`uuid`) || require('uuid/v4')()
        localStorage.setItem(`uuid`, data.uuid)
      }

      return axios({
        url: 'oauth/access_token',
        method: 'POST',
        data: data
      }).then((resp) => {
        if (resp.error_code !== 'SUCCESS') {
          throw new Error(resp.reason)
        }
        commit('set_ticket', {
          grant_type: config.grantType,
          access_token: resp.result.access_token,
          expires_at: parseInt(new Date().getTime() / 1000) + resp.result.expires_in,
          openid: resp.result.openid
        })
        return resp
      })
    },
    // 获取用户信息
    get_user_profile ({commit, state}) {
      return axios({
        url: 'user/info',
        method: 'POST'
      }).then((resp) => {
        if (resp.error_code !== 'SUCCESS') {
          throw new Error(resp.reason)
        }
        commit('set_user_profile', resp.result)
        return resp
      })
    },
    // 跳转授权
    redirect_authorize ({commit, state}) {
      // localStorage.removeItem(`ticket_${config.clientId}`)

      // const isWechat = !!navigator.userAgent.match(/MicroMessenger/i)

      // return axios({
      //   url: 'interface/Login/auth',
      //   method: 'POST',
      //   data: {
      //     client_id: config.clientId,
      //     redirect_uri: window.location.href,
      //     scope: 'snsapi_userinfo',
      //     channel: isWechat ? 'wechat' : 'qq',
      //     state: 'STATE'
      //   }
      // }).then((resp) => {
      //   window.location.replace(resp.data)
      // })
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
          // console.log(response.data, 'response.data')
          window.location.replace(response.data)
        } else {
          this.showAlert(response.msg)
        }
      })
    },
    // 检测是否登录
    check_authorize ({dispatch, state}) {
      return new Promise((resolve, reject) => {
        // 如果授权成功, 直接过
        if (typeof state.ticket.access_token !== 'undefined') {
          // 如果已经获取过用户信息了, 则直接跳过
          if (state.profile.openid) {
            return resolve(true)
          }
          // 获取用户信息
          return dispatch('get_user_profile').then((resp) => {
            return resolve(true)
          })
        }

        return dispatch('get_access_token').then((resp) => {
          // 获取用户信息
          return dispatch('get_user_profile').then((resp) => {
            return resolve(true)
          })
        }).catch((resp) => {
          return reject(new Error('登录失效'))
        })
      })
    },
    // 注销登录
    logout ({dispatch, state}) {
      localStorage.removeItem(`ticket_${config.clientId}`)
      state = {}
    }
  },
  getters: {}
}
