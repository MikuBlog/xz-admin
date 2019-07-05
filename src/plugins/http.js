	import axios from 'axios'
	import { Loading, Message } from 'element-ui'
	import 'element-ui/lib/theme-chalk/index.css';

	/*
	*	通过状态码返回对应的提示
	*	@param {Integer} result 状态码
	*/
	function justifyStatus(result) {
		switch(result) {
			case 404: Message({
				showClose: true,
				message: "找不到该接口，请联系程序员进行修复",
				type: 'error'
			});break;
			case 401: Message({
				showClose: true,
				message: "权限不足",
				type: 'error'
			});break;
			case 0: Message({
				showClose: true,
				message: "请登录",
				type: 'error'
			});break;
			case 500: 
			default: Message({
				showClose: true,
				message: "服务器出错，请联系程序员进行修复",
				type: 'error'
			});
		}
	}
	
	/*
	*	添加拦截器函数
	*	@param {Object} obj axios实例对象
	*/
	function addInterceptors(obj) {
		obj.interceptors.request
			.use(config => {
				loading = Loading.service({ fullscreen: true })
				return config
			}, err => {
				justifyStatus('none')
				loading.close()
				return Promise.reject(err)
			})
			
		obj.interceptors.response
			.use(response => {
				loading.close()
				return response;
			}, err => {
				justifyStatus(err.response.status)
				loading.close()
				return Promise.reject(err)
			})
	}
	
	let loading
	
	// 给所有的实例配置请求根路径
	axios.defaults.baseURL = 'http://myinterface.xuanzai.top/'
	
    // 配置请求时限
	axios.defaults.timeout = 3000 

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
