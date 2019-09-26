	import axios from 'axios'
	import router from '@/router'
	import { Loading  } from 'element-ui'
	import storage from '../storage/storage'
	import Message from '../message/message'

	/**
	 * @author xuanzai
	 * @description 添加拦截器函数
	 * @param {Object} obj axios实例对象 
	 */
	function addInterceptors(obj) {
		obj
			.interceptors
			.request
			.use(config => {
        // 统一对中文字符进行编码
        config.url = encodeURI(config.url)
				/**
				 * 如果是登陆请求，不发送token
				 * 否则都带token过去
				 */
				config.url.indexOf('login') != -1
				? config.headers.Authorization = ""
				: config.headers.Authorization = `Bearer ${storage.getMemoryPmt('token')}`
				loading = Loading.service({ fullscreen: true, background: "rgba(0, 0, 0, .2)" })
				return config
			}, err => {
				Message.errorMsg('服务器出错，请联系客服进行处理')
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
        const regexp = new RegExp(/timeout/g)
				typeof err.response === "object" 
				? (err.response.status === 401
					? Message
						.showMsgBox({ title: "系统提示", msg: "登录信息已过期，是否重新登录？", type: "warning" })
						.then(() => {
							storage.setMemoryPmt('token', '')
							router.push({ path: "/login" })
						})
          : err.response.status === 403
          ? router.push({ path: "/401" })
          : Message
						.errorMsg(
							JSON.parse(err.response.request.response).message 
							? JSON.parse(err.response.request.response).message.replace(/{.*}/g, '')
							: JSON.parse(err.response.request.response)
				))
				: (regexp.test(err)
				? Message.errorMsg('请求超时，请联系客服进行处理')
				: Message.errorMsg('服务器出错，请联系客服进行处理'))
				loading.close()
				return Promise.reject(err)
			})
	}

	let loading
	// 给所有的实例配置请求根路径
	axios.defaults.baseURL = baseUrl
    // 配置请求时限
	axios.defaults.timeout = 10000 
	// 给所有的实例配置同一的返回数据格式
	axios.defaults.transformResponse = [(data) => {
		try {
			return JSON.parse(data).data 
		}catch(e) {
			return data
		}
	}]	
	/**
	 * @author xuanzai
	 * @description 键值形式发送
	 */
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
	/**
	 * @author xuanzai
	 * @description json形式发送
	 */
	const http_json = axios.create({
		headers: {
			'Content-Type': 'application/json'
		},
		transformRequest: [(data) => {
			return JSON.stringify(data)
		}],
	})	
	/**
	 * @author xuanzai
	 * @description 文件类型发送
	 */
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
