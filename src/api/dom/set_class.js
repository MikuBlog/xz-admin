/**
 * @author xuanzai
 * @description 添加类
 * @param {DOM} element 
 * @param {String} name 
 */
function addClass(element, name) {
    element.classList.add(name)
}

function removeClass(element, name) {
    element.classList.remove(name)
}

function getClassName(element) {
    return element.getAttribute('className')
}

export default {
    addClass,
    removeClass,
    getClassName
}