/**
 * @author xuanzai
 * @description 拖拽dialog
 */
function drag(el) {
  const 
    dialogHeaderEl = el.querySelector('.el-dialog__header'),
    dragDom = el.querySelector('.el-dialog'),
    sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
  dialogHeaderEl.style.cursor = 'move'
  dialogHeaderEl.onmousedown = (e) => {
    let 
      disX = e.clientX, 
      disY = e.clientY,
      styL, styT
    if (sty.left.includes('%')) {
      styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
      styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
    } else {
      styL = +sty.left.replace(/\px/g, '')
      styT = +sty.top.replace(/\px/g, '')
    }
    document.onmousemove = function (e) {
      dragDom.style.left = `${e.clientX - ( disX - styL )}px`
      dragDom.style.top = `${e.clientY - ( disY - styT )}px`
    }
    document.onmouseup = function (e) {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
}

export default {
  bind: drag
}