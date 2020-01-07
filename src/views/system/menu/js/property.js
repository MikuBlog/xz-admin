export default {
  data() {
    return {
      isShow: true,
      expand: true,
      searchVal: "",
      isAdd: true,
      menuList: [],
      buttonOptions: [{
        type: "primary",
        icons: 'el-icon-plus',
        title: "添加菜单",
        method: "showAddMenu"
      }, {
				type: "warning",
				icons: "el-icon-download",
				title: "导出菜单列表",
				method: "downloadList"
			}],
      options: {
        animation: 150,
      }
    };
  }
} 