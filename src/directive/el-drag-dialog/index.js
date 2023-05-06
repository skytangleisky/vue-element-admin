import Vue from 'vue'
import { gsap, Power4 } from 'gsap'
// v-dialogDrag: 弹窗拖拽自定义指令，已在main.js引入,使用即可，每个 el-dialog 加指令
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    let obj
    const mousemoveFunc = event => {
      var ev = event || window.event
      posl = { x: ev.clientX, y: ev.clientY }
      var x = posl.x - pos.x; var y = posl.y - pos.y
      pos = JSON.parse(JSON.stringify(posl))
      obj.targetLeft += x
      obj.targetTop += y
      gsap.to(obj, {
        duration: 1,
        left: obj.targetLeft,
        top: obj.targetTop,
        onUpdate: () => {
          el.style.left = obj.left + 'px'
          el.style.top = obj.top + 'px'
        },
        ease: Power4.easeOut
      })
      el.style.cursor = 'move'
    }
    const mouseupFunc = function() {
      document.removeEventListener('mousemove', mousemoveFunc)
      document.removeEventListener('mouseup', mouseupFunc)
      el.style.cursor = 'default'
    }
    var pos, posl
    window.deep = 1
    el.addEventListener('mousedown', event => {
      el.style['z-index'] = window.deep++
      var ev = event || window.event
      event.stopPropagation()
      obj = { targetLeft: el.offsetLeft, targetTop: el.offsetTop, left: el.offsetLeft, top: el.offsetTop }
      pos = { x: ev.clientX, y: ev.clientY }
      document.addEventListener('mousemove', mousemoveFunc)
      document.addEventListener('mouseup', mouseupFunc)
    })
  }
})
