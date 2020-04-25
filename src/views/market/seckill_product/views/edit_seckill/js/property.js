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
      options: [],
      form: {
        seckillSkus: [],
        seckillSpu: {
          seckillDiscount: 0,
          seckillPrice: 0,
          stopTime: "",
          info: "",
          name: "",
          cover: "",
          num: "",
          returnMoney: 0,
          spuId: "",
          startTime: "",
          activityType: 1,
          status: 1,
          timeId: "",
          limitBuy: 0
        }
      },
      rules: {
        'seckillSpu.seckillDiscount': [{ required: true, message: "请输入秒杀折扣", trigger: 'blur' }],
        'seckillSpu.seckillPrice': [{ required: true, message: "请输入秒杀价格", trigger: 'blur' }],
        'seckillSpu.timeId': [{ required: true, message: "请选择秒杀时间段", trigger: 'blur' }],
        'seckillSpu.stopTime': [{ required: true, message: "请选择结束时间", trigger: 'blur' }],
        'seckillSpu.name': [{ required: true, message: "请输入秒杀标题", trigger: 'blur' }],
        'seckillSpu.info': [{ required: true, message: "请输入秒杀简介", trigger: 'blur' }],
        'seckillSpu.returnMoney': [{ required: true, message: "请输入秒杀返现金额", trigger: 'blur' }],
        'seckillSpu.spuId': [{ required: true, message: "请选择商品", trigger: 'change' }],
        'seckillSpu.startTime': [{ required: true, message: "请选择开始时间", trigger: 'blur' }],
        'seckillSpu.status': [{ required: true, message: "请选择活动状态", trigger: 'blur' }],
        'seckillSpu.activityType': [{ required: true, message: "请选择优惠类型", trigger: 'blur' }],
        'seckillSpu.limitBuy': [{ required: true, message: "请输入限购数", trigger: 'blur' }],
      }
    }
  }
}