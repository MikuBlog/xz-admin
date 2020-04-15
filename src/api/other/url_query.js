/**
 * @author xuanzai
 * @description 获取url后的参数
 * @param { url } 传入的url，默认为空
 * @returns { Object }
 */
function urlQuery(url = "") {
  let
    query = {},
    param = ""
  if (url) {
    param = url.split("?")[1]
  } else if (window.location.search) {
    param = window.location.search.replace("?", "")
  } else {
    return query
  }
  if(!param) {
    return  {}
  }
  param.split("&").forEach(val => {
    const
      key = val.split("=")[0],
      value = val.split("=")[1]
    query[key] = value
  })
  return query
}

export default urlQuery
