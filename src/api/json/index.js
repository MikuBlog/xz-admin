/**
 * @author xuanzai
 * @description json美化(配合pre标签使用)
 * @param {JSON | Object} json json字符串或对象
 * @param {Number} tab 空格的个数
 * @returns {JSON} 返回美化好的JSON 
 */
function jsonPretty(json, tab = 4) {
  try {
    if(typeof json == "object") {
      return JSON.stringify(json, null, tab)
    }else {
      return JSON.stringify(JSON.parse(json), null, tab)
    }
  }catch(e) {
    return json
  }
}

export default jsonPretty