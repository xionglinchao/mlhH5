import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

/**
 * axios参数
 * 文档地址: `https://blog.csdn.net/binginsist/article/details/65630547`
 */

const config = require('@/config/api').default
const _ = require('lodash')
const qs = require('querystringify')

// 设置域名信息
axios.defaults.baseURL = config.baseURL
axios.defaults.withCredentials = config.withCredentials

// 新版本接口签名
// function doSign (options) {
//   // 时间戳
//   let timestamp = parseInt(_.now() / 1000)
//   // 合并GET、POST参数
//   let query = _.assign(qs.parse(options.url.split('?')[1] || ''), options.data || {}, {
//     timestamp: timestamp,
//     version: config.verison
//   })
//   // 签名字典根据主键排序
//   let keys = _.keys(query).sort()
//   query = _.pick(query, keys)
//   // 计算接口签名
//   let sign = md5(qs.stringify(query) + config.clientSecret)
//   options.headers['X-Client-Id'] = config.clientId
//   options.headers['X-Version'] = config.verison
//   options.headers['X-Timestamp'] = timestamp
//   options.headers['X-Sign'] = sign
//   return options
// }

// 监听发送请求
axios.interceptors.request.use((options) => {
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  options.data = qs.stringify(options.data)
  // 如果已经授权过了, 下次请求自动带上token
  if (config.clientId.length > 0 && localStorage.hasOwnProperty(`ticket_${config.clientId}`)) {
    let ticket = JSON.parse(localStorage.getItem(`ticket_${config.clientId}`)) || {}
    // 如果ticket过期, 则清空ticket
    if (ticket.expires_at < parseInt(_.now() / 1000)) {
      localStorage.removeItem(`ticket_${config.clientId}`)
    } else { // 如果ticket正常，则带上token去请求接口
      options.headers['X-Token'] = ticket.access_token
    }
  }
  // 新版本接口签名
  // options = doSign(options)
  return options
}, (error) => {
  return Promise.reject(error)
})

// 监听请求返回消息
axios.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response.status === 401) {
    // 401状态 为 授权过期 或 未授权
    localStorage.setItem('token', '')
    // return store.dispatch('redirect_authorize').then((resp) => {
    //   return error.response.data
    // })
  } else if (error.response.status === 400) {
    return Promise.reject(error.response.data.reason || '未知错误')
  }
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
