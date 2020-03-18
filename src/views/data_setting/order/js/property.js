import { validateNumber } from '@/utils/form_validate'
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
        orderUnpaid: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        orderUnconfirm: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        orderComment: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
      }
		}
	}
}