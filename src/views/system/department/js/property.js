export default {
  data() {
    return {
      isShow: true,
      expand: true,
      delLoading: false,
      searchVal: "",
      selectType: "",
      isAdd: true,
      dicts: [],
      departmentList: [],
      options: [
        {
          value: "true",
          label: "正常"
        },
        {
          value: "false",
          label: "禁用"
        }
      ],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加部门",
        method: "showAddDepartment"
      }, {
				type: "warning",
				icons: "el-icon-download",
				title: "导出部门列表",
				method: "downloadList"
			}]
    };
  }
}