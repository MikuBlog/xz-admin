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
      form: {
        comSkus: [],
        comSpu: {
          combinationDiscount: 0,
          combinationPrice: 0,
          effectiveHour: 0,
          endTime: "",
          info: "",
          name: "",
          num: "",
          peopleCount: 0,
          returnMoney: 0,
          spuId: 0,
          startTime: "",
          type: 0,
          visit: 0
        }
      },
      rules: {
        
      }
    }
  }
}