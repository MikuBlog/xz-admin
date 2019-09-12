	/**
	 * @author xuanzai
	 * @description 获取url后的参数
	 * @parmas { url } 传入的url，默认为空
	 * @returns { Object }
	 */
	function urlQuery(url = "") {
	  let 
		query = {},
		list
	  if(url.split("?")[1]) {
		list = url.split("?")[1]
	  }else if (window.location.search) {
	    list = window.location.search.replace("?", "")
	  }
	  list.split("&").forEach(val => {
	    const
	      key = val.split("=")[0],
	      value = val.split("=")[1]
	    query[key] = value
	  })
	  return query
	}

	export default urlQuery