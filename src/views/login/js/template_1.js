import {
	encrypt
} from '@/utils/encrypt'
export default {
	data() {
		return {
			username: "admin",
			password: "123456",
			vcode: "",
			uuid: "",
			codeUrl: "",
		}
	},
	created() {
		this.getCode()
	},
	methods: {
		getCode() {
			this.$http({
				url: `${baseUrl}/auth/vCode`,
				method: "get"
			}).then(result => {
				const data = JSON.parse(result.request.response)
				this.uuid = data.uuid
				this.codeUrl = data.img
			})
		},
		submit() {
			if (!this.username) {
				this.$warnTip({
					title: "请填写用户名"
				})
				return
			} else if (!this.password) {
				this.$warnTip({
					title: "请填写密码"
				})
				return
			} else if (!this.vcode) {
				this.$warnTip({
					title: "请填写验证码"
				})
				return
			}
			this.$http_json({
				url: "/auth/login",
				method: "post",
				data: {
					username: this.username,
					password: encrypt(this.password),
					vcode: this.vcode,
					uuid: this.uuid
				}
			}).then(result => {
				this.$setMemoryPmt("token", result.data.token)
				this.$setMemoryPmt('username', this.username)
				this.$getMemorySes("redirect") ?
					this.$router.push({
						path: this.$getMemorySes("redirect") === '/login' ?
							'/home/welcome' :
							this.$getMemorySes("redirect")
					}) :
					this.$router.push({
						path: "/home/welcome"
					})
			}).catch(e => {
				this.getCode()
			})
		}
	}
}
