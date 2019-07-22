/**
 * @description json美化(配合pre标签使用)
 * @param {JSON | Object} json json字符串或对象
 * @returns {JSON} 返回美化好的JSON 
 */
function jsonPretty(json) {
    if(typeof json == "object") {
        return JSON.stringify(json, null, 4)
    }else {
        return JSON.stringify(JSON.parse(json), null, 4)
    }
}

export default {
    jsonPretty
}