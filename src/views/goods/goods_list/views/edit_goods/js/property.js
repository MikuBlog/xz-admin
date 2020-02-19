export default {
  data() {
    return {
			sliderImage: [],
			typeName: [],
			typeId: [],
      typeList: [],
      fileList: [],
      coverImage: "",
      goodsTypeList: [],
      skuType: [],
      skuList: [],
      typeProps: { multiple: true },
      skuProps: { multiple: true },
      dialogImageUrl: '',
      dialogVisible: false,
      brandName: "",
      skuGroup: "default",
      selectSkuLabel: [],
      selectSkuList: [],
      bindingSelectSkuList: [],
      generateSkuList: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      inputSkuVisible: false,
      inputSkuValue: '',
      inputChildrenIndex: '',
      form: {
        skus: [],
        spu: {
          attributes: "",
          barCode: "",
          brandId: "",
          brandName: "",
          codePath: "",
          costPrice: 0,
          cover: "",
          description: "",
          fictiSales: 0,
          giveIntegral: 0,
          info: "",
          keyWords: "",
          marketPrice: 0,
          merId: 0,
          merUse: 0,
          name: "",
          onBargain: 0,
          onBenefit: true,
          onBest: true,
          onFreeSend: true,
          onHot: true,
          onNew: true,
          onRecommend: true,
          onSeckill: true,
          postagePrice: 0,
          sales: 0,
          salesPrice: 0,
          showStatus: 0,
          sliderImage: [],
          sort: 0,
          soureLink: "",
          specs: "",
          stockReduceType: 0,
          totalStock: 0,
          typeId: [],
          typeName: [],
          unit: "",
          vipPrice: 0,
          visit: 0,
          warnStock: 0
        }
      },
      rules: {
				'spu.cover': [
          { required: true, message: "请选择封面", trigger: "change" }
        ],
        'spu.name': [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        'spu.info': [
          { required: true, message: "请输入商品简介", trigger: "blur" }
        ],
        'spu.barCode': [
          { required: true, message: "请输入商品条码", trigger: "blur" }
        ],
        'spu.unit': [
          { required: true, message: "请输入商品单位", trigger: "blur" }
        ],
        'spu.brandName': [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        'spu.typeId': [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        'spu.description': [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ],
        'spu.sort': [
          { required: true, message: "请输入排序号码", trigger: "change" }
        ],
        'spu.salesPrice': [
          { required: true, message: "请输入商品售价", trigger: "change" }
        ],
        'spu.postagePrice': [
          { required: true, message: "请输入邮费", trigger: "change" }
        ],
        'spu.totalStock': [
          { required: true, message: "请输入库存", trigger: "change" }
        ],
        'spu.marketPrice': [
          { required: true, message: "请输入市场价", trigger: "change" }
        ],
        'spu.giveIntegral': [
          { required: true, message: "请输入获得积分", trigger: "change" }
        ],
        'spu.costPrice': [
          { required: true, message: "请输入成本价", trigger: "change" }
        ],
        'spu.fictiSales': [
          { required: true, message: "请输入虚拟销量", trigger: "change" }
        ],
        'spu.warnStock': [
          { required: true, message: "请输入预警库存", trigger: "change" }
        ],
        'spu.onHot': [
          { required: true, message: "请选择热卖单品", trigger: "change" }
        ],
        'spu.onBenefit': [
          { required: true, message: "请选择促销单品", trigger: "change" }
        ],
        'spu.onNew': [
          { required: true, message: "请选择首发新品", trigger: "change" }
        ],
        'spu.onRecommend': [
          { required: true, message: "请选择优品推荐", trigger: "change" }
        ],
        'spu.onBest': [
          { required: true, message: "请选择精品推荐", trigger: "change" }
        ],
        'spu.stockReduceType': [
          { required: true, message: "请选择库存扣减方式", trigger: "change" }
        ],
        'spu.showStatus': [
          { required: true, message: "请选择上架方式", trigger: "change" }
        ]
      },
      buttonOptions: [{
        type: "primary",
        title: "确认",
        name: "确认",
        method: "submitForm"
      }, {
        type: "info",
        title: "重置",
        name: "重置",
        method: "resetForm"
      }]
    }
  }
}