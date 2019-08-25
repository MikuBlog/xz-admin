	/**
   * @author xuanzai
   * @description 获取url后的参数
   * @returns {Object}
   */
	function urlQuery() {
		let query = {}
		if(window.location.search) {
			let list = window.location.search.replace("?", "")
			list.split("&").forEach(val => {
				const 
					key = val.split("=")[0],
					value = val.split("=")[1]
				query[key] = value
			})
		}
		return query
  }
  
  export default urlQuery