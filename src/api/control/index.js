/**
 * @author xuanzai
 * @description 防抖函数
 * @param {Function} callback 回调函数
 * @param {Number} time 单位ms
 * @param {Boolean} immediate 第一次是否调用
 * @returns {Function}
 */
function debounce(callback, time = 1000, immediate = true) {
  // 保存定时器引用
  var clock
  // 保存函数返回的结果
  var result
  return function() {
    // 保存this指向
    var context = this
    // 如果定时器存在,就清除定时器引用
    clock && clearTimeout(clock)
    // 如果参数为true, 则为即执行函数
    if(immediate) {
      // 如果定时器引用不存在,则立刻调用函数;如果定时器存在,则不调用函数
      var isCall = !clock
      // 给定时器添加引用
      clock = setTimeout(() => {
        // time秒后去除定时器引用
        clock = null
      }, time)
      isCall && (result = callback.apply(context, arguments))
    }else {
      // time秒后执行函数
      clock = setTimeout(() => {
        callback.apply(context, arguments)	
      }, time)
    }
    // 返回函数结果(一般用于即执行函数)
    return result
  }
} 

/**
 * @author xuanzai
 * @description 节流函数
 * @param {Function} callback 回调函数
 * @param {Number} wait 单位ms
 * @returns {Function}
 */
function throttled(callback, wait = 1000) {
  var timeout, context, args, previous = 0
  // 设置一个函数,用于收尾调用(最后一次调用)
  var later = function() {
    previous = +new Date()
    timeout = null
    callback.apply(context, args)
  }
  return function() {
    // 设置当前时间
    var now = +new Date()
    // 保存当前时间差
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    /**
     * 如果时间差小于零,表示已经超过等待时间,可以立刻执行.
     * 第二种情况就是修改了系统时间
     * 如果将系统时间改为以前，则使得当前时间小于上一次的时间，出现remaining比wait大的情况
     * 如果将系统时间改为久远的未来，则使得当前时间远大于上一次的时间，出现remaining为负数的情况
     */
    if(remaining <= 0 || remaining > wait) {
      // 定时器存在,去除定时器,保存当前时间,立刻执行函数.
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      callback.apply(context, args)
    }else if(!timeout) {
      // 如果定时器不存在,将延迟函数的执行
      timeout = setTimeout(later, remaining)
    }
  }
} 

export default {
  debounce,
  throttled
}