export default {
  data() {
    return {
      isShow: true,
			isShowPic: false,
			expand: true,
      url: "",
      searchVal: "",
      goodsTypeList: [],
			selectList: [],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加商品分类",
        method: "showAddBox"
      }, {
				type: "danger",
				icons: "el-icon-delete",
				title: "批量删除商品分类",
				method: "deleteAllGoodsType"
			}],
      options: {
        animation: 150,
      }
    };
  }
} 