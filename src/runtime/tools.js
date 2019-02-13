// 工具库

// 获取get参数, 同时支持锚点后面的query参数
function getQueryString (name) {
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

export {
  getQueryString
}
