export default {
	data() {
		return {
			form: {
        id: "",
        orderUnpaid: "",
        orderUnconfirm: "",
        orderComment: "",
        enabled: true,
        sort: 1,
				groupName: "order_setting"
      },
      rules: {
        orderUnpaid: [{ required: true, message: "请输入用户下单超时时间", trigger: "blur" }],
        orderUnconfirm: [{ required: true, message: "请输入用户下单超时时间", trigger: "blur" }],
        orderComment: [{ required: true, message: "请输入用户下单超时时间", trigger: "blur" }],
      }
		}
	}
}