export default {
	data() {
		return {
			form: {
        id: "",
        scale: "",
        enabled: true,
        sort: 1,
				groupName: "integral_scale"
      },
      rules: {
        scale: [{ required: true, message: "请输入积分比例", trigger: "blur" }],
      }
		}
	}
}