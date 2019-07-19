// 将元素插入到另一个元素的末尾
function insertAfter(newEle, nowEle) {
	nowEle.parentNode.insertBefore(newEle, nowEle.nextSibling)
}

export default {
    insertAfter
}