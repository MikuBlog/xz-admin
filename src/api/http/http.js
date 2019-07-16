	import axios from 'axios'
	import { Loading, Message } from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css';

	/**
	 * @description 通过状态码返回对应的信息
	 * @param {String} message 错误信息
	 */
	function showTips(message) {
		Message({
			showClose: true,
			message: `${message}`,
			type: 'error'
		})
		// switch(result) {
		// 	case 404: 
		// 		Message({
		// 			showClose: true,
		// 			message: `${additional}`,
		// 			type: 'error'
		// 		})
		// 		break
		// 	case 401: 
		// 		Message({
		// 			showClose: true,
		// 			message: "权限不足",
		// 			type: 'error'
		// 		})
		// 		break
		// 	case 0: 
		// 		Message({
		// 			showClose: true,
		// 			message: "请登录",
		// 			type: 'error'
		// 		})
		// 		break
		// 	case 'none': 
		// 		Message({
		// 			showClose: true,
		// 			message: `${additional}`,
		// 			type: 'error'
		// 		})
		// 		break
		// 	case 500: 
		// 	default: 
		// 		Message({
		// 			showClose: true,
		// 			message: "服务器出错，请联系程序员进行修复",
		// 			type: 'error'
		// 		})
		// }
	}
	/**
	 * @description 添加拦截器函数
	 * @param {Object} obj axios实例对象 
	 */
	function addInterceptors(obj) {
		obj
			.interceptors
			.request
			.use(config => {
				/**
				 * 如果是登陆请求，不发送token
				 * 否则都带token过去
				 */
				// if(config.method === 'post') {
				// 	showTips('测试环境不允许操作')
				// 	return
				// }
				config.url.indexOf('login') != -1
				? config.headers.Authorization = ""
				: config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
				loading = Loading.service({ fullscreen: true })
				return config
			}, err => {
				showTips('服务器出错，请联系客服进行处理')
				loading.close()
				return Promise.reject(err)
			})
			
		obj
			.interceptors
			.response
			.use(response => {
				loading.close()
				return response;
			}, err => {
				typeof err.response === "object" 
				? showTips(
					JSON.parse(err.response.request.response).message.replace(/{.*}/g, '')
				)
				: showTips('服务器出错，请联系客服进行处理')
				loading.close()
				return Promise.reject(err)
			})
	}
	
	let loading
	
	// 给所有的实例配置请求根路径
	axios.defaults.baseURL = 'http://47.106.187.102:8008'
	
    // 配置请求时限
	axios.defaults.timeout = 5000 

	// 给所有的实例配置同一的返回数据格式
	axios.defaults.transformResponse = [(data) => {
		try {
			return JSON.parse(data).data 
		}catch(e) {
			return data
		}
	}]
	
	// 发送数据格式为键值对
	const http_normal = axios.create({
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		transformRequest: [(data) => {
			let str = ""
			for(let key in data) {
				str += `${key}=${data[key]}&`
			}
			return str.replace(/&$/, '')
		}],
	})
	
	// 发送数据格式为JSON格式
	const http_json = axios.create({
		headers: {
			'Content-Type': 'application/json'
		},
		transformRequest: [(data) => {
			return JSON.stringify(data)
		}],
	})
	
	// 发送数据格式为文件类型
	const http_file = axios.create({
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		transformRequest: [(data) => {
			const formData = new FormData()
			for(let key in data) {
				formData.append(key, data[key])
			}
			return formData
		}],
	})
	
	// 添加拦截器
	addInterceptors(http_normal)
	
	addInterceptors(http_json)
	
	addInterceptors(http_file)
	
	export default {
		http_normal,
		http_json,
		http_file
	}
