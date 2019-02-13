// 拖拽容器

export default {
  bind: function (el) {
    let oldClass = el.getAttribute('class')
    el.setAttribute('class', [oldClass, 'mx-drop-container'].join(' '))
  }
}
