/**
 * @author xuanzai
 * @description 设置样式
 * @param {DOM} el 
 * @param {String} ruleName 
 * @param {String} value 
 */
function setStyle(el, ruleName, value) {
	el.style[ruleName] = value
}

function setCssText(el, rule) {
  el.style.cssText = rule
}

export default {
  setStyle,
  setCssText
}
    
