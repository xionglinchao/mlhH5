// 路由配置文件

let routes = []

// 默认页面
routes.push({
  path: '/',
  name: 'index',
  meta: {
    authorize: true // 是否强制校验登录
  },
  component: () => import(
    /* webpackChunkName: "helloworld" */
    /* webpackMode: "lazy" */
    `@/pages/index`
  )
})

routes.push({
  path: '/drop',
  name: 'drop',
  meta: {
    authorize: false // 是否强制校验登录
  },
  component: () => import(
    /* webpackChunkName: "drop" */
    /* webpackMode: "lazy" */
    `@/pages/Drop`
  )
})

// 404 页面
routes.push({
  path: '*',
  name: '404',
  component: () => import(
    /* webpackChunkName: "404" */
    /* webpackMode: "lazy" */
    `@/pages/404`
  )
})
// 系列课程详情
routes.push({
  path: '/courseDetail',
  name: 'courseDetail',
  component: () => import(
    `@/pages/courseDetail`
  )
})
// 支付
routes.push({
  path: '/pay',
  name: 'pay',
  component: () => import(
    `@/pages/pay`
  )
})
// 登入
routes.push({
  path: '/login',
  name: 'login',
  component: () => import(
    `@/pages/login`
  )
})
// 优惠券列表
routes.push({
  path: '/couponList',
  name: 'couponList',
  component: () => import(
    `@/pages/couponList`
  )
})

export default routes
