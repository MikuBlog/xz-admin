/**
 * @author xuanzai
 * @description 将新元素插入到旧元素前面
 * @param {DOM} newEle 
 * @param {DOM} nowEle 
 */
function insertAfter(newEle, nowEle) {
	nowEle.parentNode.insertBefore(newEle, nowEle.nextSibling)
}

export default insertAfter