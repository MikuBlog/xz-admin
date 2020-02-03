export default {
  data() {
    return {
      isShow: true,
      expand: true,
      searchVal: "",
      isAdd: true,
      goodsTypeList: [],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加商品分类",
        method: "showAddBox"
      }, {
				type: "warning",
				icons: "el-icon-download",
				title: "导出商品分类列表",
				method: "downloadList"
			}],
      options: {
        animation: 150,
      }
    };
  }
} 