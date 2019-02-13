// 接口配置项

export default {
  // 接口信息
  // h5.zhuosenkj.cn
  baseURL: 'https://meilihua.06baobao.com/',
  // baseURL: 'https://m.apis.pinmeng.xin/',
  // 应用信息
  clientId: 'pmb7c24bce90ca7b', // 测试应用(正式项目需要替换)
  clientSecret: 'bff3842653d7a7cc1597577ba051cfbe', // 测试应用(正式项目需要替换)
  verison: '1.0.0', // 接口版本
  grantType: 'authorization_code', // 授权类型 authorization_code 授权码登录 temporary_auth 临时凭证登录
  // 注意：当grantType参数为 temporary_auth 时，强制走临时授权凭证
  forceGrantType: { // 强制使用指定授权类 "UA: 指定授权类型"
    'NewsArticle': 'temporary_auth' // 今日头条使用临时凭证
    // 'MicroMessenger': 'temporary_auth' // 今日头条使用临时凭证
  },
  allowChannel: ['wechat', 'qq'], // 授权渠道【20180508新增】, 当grantType参数为authorization_code时，会根据当前环境选择相应的授权渠道。如果没有默认走temporary_auth
  // 其他配置
  withCredentials: true, // 允许cookie跨域
  // autoReAuthorize: true // 【规划中】授权过期/401状态码自动重新授权,
  shareConfig: { // 分享配置
    // 微信
    wechat: {
      debug: false, // 调试模式
      beta: true, // 使用最新版
      jsApiList: [
        'onMenuShareTimeline', // 分享到朋友圈
        'onMenuShareAppMessage', // 发送给朋友
        'hideAllNonBaseMenuItem', // 隐藏所有非基础菜单
        'showMenuItems' // 显示右上角菜单项
      ]
    },
    // 微博(暂不支持)
    weibo: {},
    // QQ(暂不支持)
    qq: {}
  }
}
