export default {
  data() {
    return {
      searchVal_1: "",
      selectType_1: "",
      searchVal_2: "",
      dictName: "",
      beloneDictName: "",
      isAdd_1: true,
      isAdd_2: true,
      // 当前页数
      nowPage_1: 1,
      // 当前页条数
      nowSize_1: 10,
      // 总条数
      totalElements_1: 0,
      // 当前页数
      nowPage_2: 1, 
      // 当前页条数
      nowSize_2: 10,
      // 总条数
      totalElements_2: 0,
      isShowAddBox: false,
      isShowDetailBox: false,
      dictionaryList: [],
      detailList: [],
      options: [
        {
          value: "name",
          label: "名称"
        },
        {
          value: "remark",
          label: "描述"
        }
      ],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加字典",
        method: "addDictionary"
      }, {
        type: "success",
        icons: 'el-icon-plus',
        title: "添加字典详情",
        method: "addDetail"
      }, {
				type: "warning",
				icons: "el-icon-download",
				title: "导出字典列表",
				method: "downloadList"
			}]
    };
  }
}