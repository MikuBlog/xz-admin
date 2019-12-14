// 判断是否为IE浏览器
function isIE() {
  return navigator.userAgent.toLowerCase().indexOf("trident") != -1
}

// 判断环境是否为移动端
function isMobile() {
  const
    mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire"),
    browser = navigator.userAgent.toLowerCase()
  for (var i = 0, len = mobileAgent.length; i < len; i++) {
    if (browser.indexOf(mobileAgent[i]) != -1) {
      return true
    }
  }
  return false
}
// 判断环境是否为ipad
function isIpad() {
  const
    mobileAgent = "ipad",
    browser = navigator.userAgent.toLowerCase()
  if (browser.indexOf(mobileAgent) != -1) {
    return true
  }
}
export default {
  isIE,
  isIpad,
  isMobile
}