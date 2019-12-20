import style from '@/api/dom/set_style'
/**
 * @author xuanzai
 * @description 初始化元素大小，强制适应目标元素的宽高
 */
let ele, val

function initialSize() {
  style.setStyle(ele, 'width', `${document.querySelector(val).offsetWidth}px`)
  style.setStyle(ele, 'height', `${document.querySelector(val).offsetHeight}px`)
}

function initialListener(el, binding) {
  ele = el,
  val = binding.value
  initialSize()
  window.addEventListener('resize', initialSize)
}

function removeListener() {
  window.removeEventListener('resize', initialSize)
}

export default {
  inserted: initialListener,
  unbind: removeListener
}


