/**
 * @author xuanzai
 * @description 排序
 * @param {Array} list 需要排序的数组
 * @param {Boolean} isDes 是否倒序
 * @param {String} property 如果排序元素为对象，可指定需要排序的字段
 * @returns {Array} 返回新的数组
 */
function sortList(list, isDes = false, property) {
  if (property) {
    return list.sort((a, b) => {
      return isDes
        ? b[property] - a[property]
        : a[property] - b[property]
    })
  } else {
    return list.sort((a, b) => {
      return isDes
        ? b - a
        : a - b
    })
  }
}

export default sortList