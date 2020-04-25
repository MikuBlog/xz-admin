export default {
  data() {
    return {
      id: this.$route.query.id,
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
        comSkus: [],
        comSpu: {
          id: "",
          combinationDiscount: 0,
          combinationPrice: 0,
          effectiveHour: "",
          endTime: "",
          info: "",
          name: "",
          cover: "",
          num: "",
          peopleCount: 0,
          returnMoney: 0,
          spuId: "",
          startTime: "",
          activityType: 1,
          ruleType: 0,
          status: 1
        }
      },
      rules: {
        'comSpu.combinationDiscount': [{ required: true, message: "请输入拼团折扣", trigger: 'blur' }],
        'comSpu.combinationPrice': [{ required: true, message: "请输入拼团价格", trigger: 'blur' }],
        'comSpu.effectiveHour': [{ required: true, message: "请输入拼团有效时间", trigger: 'blur' }],
        'comSpu.endTime': [{ required: true, message: "请选择结束时间", trigger: 'blur' }],
        'comSpu.name': [{ required: true, message: "请输入拼团标题", trigger: 'blur' }],
        'comSpu.info': [{ required: true, message: "请输入拼团简介", trigger: 'blur' }],
        'comSpu.peopleCount': [{ required: true, message: "请输入拼团人数", trigger: 'blur' }],
        'comSpu.returnMoney': [{ required: true, message: "请输入拼团返现金额", trigger: 'blur' }],
        'comSpu.ruleType': [{ required: true, message: "请选择拼团规则状态", trigger: 'blur' }],
        'comSpu.spuId': [{ required: true, message: "请选择商品", trigger: 'change' }],
        'comSpu.startTime': [{ required: true, message: "请选择开始时间", trigger: 'blur' }],
        'comSpu.status': [{ required: true, message: "请选择活动状态", trigger: 'blur' }],
        'comSpu.activityType': [{ required: true, message: "请选择优惠类型", trigger: 'blur' }]
      }
    }
  }
}