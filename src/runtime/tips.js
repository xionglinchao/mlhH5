import Vue from 'vue'

/*
 * @method 显示alert
 * @param{
 *  title: alert标题栏 非必填 默认文字为提示 String
 *  msg: 必填参数 alert显示的内容 String
 *  callback 非必填 alert消失时执行的回调方法 function类型
 * }
*/
Vue.showAlert = Vue.prototype.showAlert = function (msg, title = '提示', callback) {
  if (!msg) {
    return false
  }
  Vue.$vux.alert.show({
    title: title || '提示',
    content: msg,
    onHide () {
      if (typeof callback === 'function') {
        callback()
      }
      // typeof callback === 'function' ? callback() : ''
    }
  })
}
/*
 * @method 页面跳转
 * @param{
 *  params 所携带的url参数 Object
 * }
*/
Vue.prototype.toPage = function (name, query) {
  console.log('query', query)
  this.$router.push({
    name: name,
    query: query || ''
  })
}
