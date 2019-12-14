import defaultConfig from '@/global/js/config'
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

/**
 * @author xuanzai
 * @description 设置内联样式
 * @param {DOM} el 
 * @param {String} rule
 */
function setCssText(el, rule) {
  el.style.cssText = rule
}

/**
 * @author xuanzai
 * @description 设置全局样式
 * @param {String} css css代码
 * @param {String} className 类名
 */
function createStyle(css = "", className = "") {
  const style = className
    ? document.querySelector(`.${className}`)
    : null
  if (style) {
    style.innerText = css
  } else {
    const style = document.createElement('style')
    className && (style.className = className)
    style.innerText = css
    document.querySelector('head').appendChild(style)
  }
}
/**
 * @author xuanzai
 * @description 黑暗模式
 * @param {Boolean} isDark 
 */
function darkMode(isDark = true) {
  let ts = defaultConfig.excludeEles
  ts =
    "body," +
    ts.join(",") +
    "{filter:invert(100%) hue-rotate(180deg)!important}" +
    ts
      .map(function(p) {
        return ts
          .map(function(p2) {
            return p + " " + p2;
          })
          .join(",");
      })
      .join(",") +
    "{filter:invert(0%) hue-rotate(180deg);}"
  createStyle(`${isDark ? ts : ''}`, 'dark-mode')
}
/**
 * @author xuanzai
 * @description 色弱模式
 * @param {Boolean} isWeakness 
 */
function weaknessMode(isWeakness = true) {
  let ts = defaultConfig.excludeEles
  ts =
    "body," +
    ts.join(",") +
    "{filter:invert(.8)!important}" +
    ts
      .map(function(p) {
        return ts
          .map(function(p2) {
            return p + " " + p2;
          })
          .join(",");
      })
      .join(",") +
    "{filter:invert(0%)}"
  createStyle(`
  ${ isWeakness
  ? ts
  : ""}`, 'weakness-mode')
}
/**
 * @author xuanzai
 * @description 反转模式
 * @param {Boolean} isHueRotate 
 */
function hueRotate(isHueRotate = true) {
  let ts = defaultConfig.excludeEles
  ts =
    "body," +
    ts.join(",") +
    "{filter:hue-rotate(180deg)!important}" +
    ts
      .map(function(p) {
        return ts
          .map(function(p2) {
            return p + " " + p2;
          })
          .join(",");
      })
      .join(",") +
    "{filter: hue-rotate(0deg)}"
  createStyle(`
  ${ isHueRotate
  ? ts
  : ""}`, 'hue-rotate-mode')
}

export default {
  setStyle,
  setCssText,
  createStyle,
  darkMode,
  weaknessMode,
  hueRotate
}

