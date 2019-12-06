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
    if ((typeof list[0][property]).toLowerCase() === 'number') {
      return list.sort((a, b) => {
        return isDes
          ? b[property] - a[property]
          : a[property] - b[property]
      })
    } else {
      return list.sort((a, b) => {
        return isDes
          ? new Date(b[property]).getTime() - new Date(a[property]).getTime()
          : new Date(a[property]).getTime() - new Date(b[property]).getTime()
      })
    }
  } else {
    return list.sort((a, b) => {
      return isDes
        ? b - a
        : a - b
    })
  }
}
/**
 * @description 模糊搜索数组
 * @param {Array} list 元素为对象的数组
 * @param {Array} keys 需要搜索的键
 * @param {String} value 需要搜索的值
 */
function searchResult(list, keys, value) {
  return new Fuse(list, {
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys
  }).search(value)
}

export default {
  sortList,
  searchResult
}