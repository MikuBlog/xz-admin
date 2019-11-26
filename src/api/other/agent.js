// 判断是否为IE浏览器
function isIE() {
  return navigator.userAgent.toLowerCase().indexOf("trident") != -1
}

export default {
  isIE
}