// 拖拽节点

export default {
  bind: function (el) {
    let oldClass = el.getAttribute('class')
    el.setAttribute('class', [oldClass, 'mx-drop-node'].join(' '))
    el.ontouchstart = function (event) {
      let point = event.touches[0]
      let oldStyle = el.getAttribute('style')

      // 计算偏移差值
      let disX = point.pageX - el.offsetLeft
      let disY = point.pageY - el.offsetTop

      // 初始化拖动范围
      let boxEls = document.getElementsByClassName('mx-drop-container')
      let _box = []
      for (let i = 0; i < boxEls.length; i++) {
        let el = boxEls[i]
        let style = getComputedStyle(el)

        let rect = el.getBoundingClientRect()
        _box.push({
          el: el,
          height: rect.height,
          width: rect.width,
          x: rect.left,
          y: rect.top,
          angle: 0,
          zIndex: style.zIndex === 'auto' ? 0 : parseInt(style.zIndex)
        })
      }

      // 监听浏览器右键重置
      document.oncontextmenu = function () {
        el.ontouchend()
        return false
      }

      el.ontouchmove = function (event) {
        event.preventDefault()
        let point = event.touches[0]
        el.style.left = `${point.pageX - disX}px`
        el.style.top = `${point.pageY - disY}px`
        el._x = point.pageX
        el._y = point.pageY
      }

      el.ontouchcancel = el.ontouchend = function () {
        let lastLayer = {}
        // 计算在哪个框中
        for (let i = 0; i < _box.length; i++) {
          let pBox = _box[i]
          let cp = {
            x: pBox.x + pBox.width / 2,
            y: pBox.y + pBox.height / 2
          }
          let a = -pBox.angle * Math.PI / 180
          let x0 = (el._x - cp.x) * Math.cos(a) - (el._y - cp.y) * Math.sin(a) + cp.x
          let y0 = (el._x - cp.x) * Math.sin(a) + (el._y - cp.y) * Math.cos(a) + cp.y
          if (x0 >= pBox.x && x0 <= pBox.x + pBox.width && y0 >= pBox.y && y0 <= pBox.y + pBox.height) {
            if (!lastLayer.zIndex || lastLayer.zIndex < pBox.zIndex) {
              lastLayer = pBox
            }
          }
        }

        if (lastLayer.el) {
          // 1. 创建一个事件对象 document.createEvent(event)
          let event = document.createEvent('Event')
          // 2. 初始化事件对象 event.initEvent(type, bubbles, true)
          event.initEvent('drop', true, true)
          // 3. 分发事件  dom.dispatchEvent(event)
          lastLayer.el.dispatchEvent(event)
        }

        if (oldStyle) {
          el.setAttribute('style', oldStyle)
        } else {
          el.removeAttribute('style')
        }
        el._x = null
        el._y = null
        el.ontouchmove = null
        el.ontouchend = null
        document.oncontextmenu = null
      }
    }
  }
}
