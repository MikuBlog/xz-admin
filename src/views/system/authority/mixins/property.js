export default {
  data() {
    return {
      isShow: true,
      expand: true,
      delLoading: false,
      searchVal: "",
      selectVal: "",
      isAdd: true,
      authorityList: [],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加权限",
        method: "showAddAuthority"
      }, {
				type: "warning",
				icons: "el-icon-download",
				title: "导出权限列表",
				method: "downloadList"
			}]
    };
  }
}