// 分享配置项

export default {
  // 默认场景
  default: {
    title: '默认分享标题', // 分享标题
    desc: '默认分享描述', // 分享描述
    imgUrl: 'https://placekitten.com/200/200', // 分享图标
    link: window.location.href, // 分享地址
    success: function () {
      console.log('分享成功的回调信息')
    }
  },
  // 自定义场景
  scene1: {
    title: '自定义标题1'
  }
}
