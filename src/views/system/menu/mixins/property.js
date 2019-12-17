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
      }]
    };
  }
} 