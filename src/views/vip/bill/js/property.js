export default {
	data() {
		return {
			searchVal: "",
      category: "",
      type: "",
			selectList: [],
			billList: [],
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0,
			options_1: [{
        label: "积分",
        value: "integral"
      }, {
        label: "余额",
        value: "now_money"
      }],
      options_2: [{
        label: "佣金",
        value: "brokerage"
      }, {
        label: "签到",
        value: "sign"
      }]
		}
	}
}