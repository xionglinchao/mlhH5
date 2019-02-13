<template>
  <div id="app" :style="{'overflow': 'auto', 'height': '100%'}">
    <x-loading v-if="!app.pageReady"/>
    <template v-else>
      <router-view/>
      <div v-transfer-dom>
        <remote-script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js" v-if="app.browser.wechat"/>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getQueryString } from '@/runtime/tools'
import XLoading from '@/components/XLoading'
export default {
  name: 'app',
  components: {
    [XLoading.name]: XLoading
  },
  computed: {
    ...mapState({
      user: state => state.user,
      app: state => state.app
    })
  },
  watch: {
    'user.profile': function () {
      let that = this
      setTimeout(() => {
        that.$store.commit('set_page_ready', true)
      }, 100)
    }
  },
  data () {
    return {
      windowHeight: window.innerHeight + 'px',
      token: ''
    }
  },

  mounted () {
    let that = this
    this.$store.commit('set_page_ready', true)
    // 兼容android授权后无法正常显示页面的问题
    function fixedWxCallbackForAndroid () {
      window.removeEventListener('hashchange', fixedWxCallbackForAndroid, false)
      if (!that.app.pageReady) {
        console.log('fixedWxCallbackForAndroid')
        window.location.reload()
      }
    }
    window.addEventListener('hashchange', fixedWxCallbackForAndroid, false)
  },
  beforeCreate () {
    let that = this
    if (getQueryString('debug')) {
      const VConsole = require('vconsole')
      that.vConsole = new VConsole()
    }
  },
  methods: {
    // 授权
    onLogin () {
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
      this.axios({
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
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
<style lang="stylus">
/* 通用样式 */
* {
  margin: 0;
  padding: 0;
  -webkit-touch-callout: none;
  box-sizing: border-box;
}
html, body {
  height: 100%;
}

#app {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.container{
  position: relative;
  width: 100%;
  height: 100%;
}
img {
  vertical-align: top;
  // pointer-events: none;
}

.page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.weui-toast{
  font-size:16px;
  top: 50%;
  transform:translateY(-50%);
}
ul, li {
  list-style: none;
}
img {
  vertical-align: top;
}
.beyondOneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
.beyondTwoLine {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.weui-dialog {
  font-size 24px;
}
/* 全局自定义样式 */

</style>
