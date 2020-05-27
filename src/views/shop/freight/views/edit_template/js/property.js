import { validateBothPhMob } from '@/utils/form_validate'
export default {
  data() {
    return {
      typeList: [],
      coverImage: "",
      address: "",
      preAddress: "",
      addressList: [],
      defaultData: [{
        addCount: 0,
        addFee: 0,
        area: ',,',
        freeByMoney: 0,
        freeByNumber: 0,
        start: 0,
        startFee: 0,
        isFreeByNumber: false,
        isFreeByMoney: false
      }],
      addressTable: [],
      form: {
        id: this.$route.query.id,
        name: "",
        packagePrice: 0,
        freightType: 0
      },
      rules: {
        name: [
          { required: true, message: "请输入门店名称", trigger: "blur" }
        ],
        packagePrice: [
          { required: true, message: "请输入包装费用", trigger: "blur" }
        ],
        freightType: [
          { required: true, message: "请选择快递收费方式", trigger: "blur" }
        ]
      }
    }
  }
}