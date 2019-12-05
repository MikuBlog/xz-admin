export default () => {
  // 默认为浅拷贝
  var deep = false
  // 指定初始索引为1
  var i = 1
  // 如果传入的第一个参数为空,则给该变量一个空对象
  var target = arguments[0] || {}
  // 如果第一个参数为布尔值(判断传入的目标对象是第一个参数还是第二个参数)
  if(typeof target === "boolean") {
    // 将该参数赋值给deep变量,保存函数的调用方式
    deep = target
    // 然后将第二个参数交给该变量(判断该参数是否为对象)
    target = arguments[i] || {} 
    // 索引加一
    i ++
  }
  // 判断target是否为对象或则为函数
  if (typeof target !== "object") {
    target = {}
  }
  // 遍历后面的所有参数
  for(len = arguments.length; i < len; i ++) {
    var options = arguments[i]
    if(options !== null) {
      for(var name in options) {
        // 保存目标函数属性(如果目标对象的该属性是个对象，那么在该对象的基础上继续拷贝)
        var src = target[name]
        // 保存复制的属性
        var copy = options[name]
        // 解决循环引用问题
        if(copy === target) {
          continue
        }
        // 如果为深拷贝,属性存在,属性是对象,递归进行深拷贝
        if(deep && copy && typeof copy == "object") {
          src = Array.isArray(copy) ? (src && Array.isArray(src) ? src : []) : (src && Object.getPrototypeOf(src) === Object.prototype ? src : {})
          target[name] = extend(deep, src, copy)
        }else if(copy !== undefined) {
          // 如果不是对象则直接赋值
          target[name] = copy
        }
      }
    }
  }
  return target
}