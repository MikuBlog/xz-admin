import { validateNumber } from '@/utils/form_validate'
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
        scale: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
      }
		}
	}
}