import Vue from 'vue'
import Vuex from 'vuex'

import TransferDom from '@/directives/transfer-dom'
import DropContainer from '@/directives/drop-container'
import DropNode from '@/directives/drop-node'

import XImage from '@/components/XImage'
import XPage from '@/components/XPage'

// 框架样式必须采用这个方式载入, 自动计算rem
// require('mand-mobile/lib/mand-mobile.css')

// 全局载入组件
Vue.component(XImage.name, XImage)
Vue.component(XPage.name, XPage)

// 动态按需加载外部js组件 参考链接: https://www.cnblogs.com/zhuchenglin/p/7455203.html
Vue.component('remote-script', {
  render: function (createElement) {
    var self = this
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: function (event) {
          self.$emit('load', event)
        },
        error: function (event) {
          self.$emit('error', event)
        },
        readystatechange: function (event) {
          if (this.readyState === 'complete') {
            self.$emit('load', event)
          }
        }
      }
    })
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
})

Vue.directive('transfer-dom', TransferDom)
Vue.directive('drop-container', DropContainer)
Vue.directive('drop-node', DropNode)

Vue.use(Vuex)

// 初始化axios
require('./axios')

// 开启低端设备兼容
require('es6-promise').polyfill()

// 关闭框架控制台提示
Vue.config.productionTip = false
