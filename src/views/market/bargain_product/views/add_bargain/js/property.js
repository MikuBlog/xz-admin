export default {
  data() {
    return {
      productName: "",
      brandName: "",
      typeId: "",
      goodsTypeList: [],
      goodsList: [],
      selectList: [],
      typeProps: { multiple: true },
      // 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
      totalElements: 0,
      product: "",
      form: {
        bargainSkus: [],
        bargainSpu: {
          bargainPrice: 0,
          info: "",
          name: "",
          cover: "",
          num: "",
          spuId: "",
          ruleType: 0,
          status: 1,
          rule: "",
          limitBuy: 0,
          bargainMinPrice: 0,
          bargainMaxPrice: 0,
          minPrice: 0,
          bargainNum: 0,
          startTime: "",
          stopTime: ""
        }
      },
      rules: {
        'bargainSpu.bargainPrice': [{ required: true, message: "请输入砍价金额", trigger: 'blur' }],
        'bargainSpu.stopTime': [{ required: true, message: "请选择结束时间", trigger: 'blur' }],
        'bargainSpu.name': [{ required: true, message: "请输入砍价标题", trigger: 'blur' }],
        'bargainSpu.info': [{ required: true, message: "请输入砍价简介", trigger: 'blur' }],
        'bargainSpu.ruleType': [{ required: true, message: "请选择砍价规则状态", trigger: 'blur' }],
        'bargainSpu.spuId': [{ required: true, message: "请选择商品", trigger: 'change' }],
        'bargainSpu.startTime': [{ required: true, message: "请选择开始时间", trigger: 'blur' }],
        'bargainSpu.status': [{ required: true, message: "请选择活动状态", trigger: 'blur' }],
        'bargainSpu.bargainMinPrice': [{ required: true, message: "请输入单次砍最低价", trigger: 'blur' }],
        'bargainSpu.bargainMaxPrice': [{ required: true, message: "请输入单次砍最高价", trigger: 'blur' }],
        'bargainSpu.rule': [{ required: true, message: "请输入砍价规则", trigger: 'blur' }],
        'bargainSpu.bargainNum': [{ required: true, message: "请输入用户砍价", trigger: 'blur' }],
        'bargainSpu.minPrice': [{ required: true, message: "请输入允许砍到最低价", trigger: 'blur' }],
        'bargainSpu.limitBuy': [{ required: true, message: "请输入限购数量", trigger: 'blur' }],
      }
    }
  }
}