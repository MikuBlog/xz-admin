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
        icons: 'el-icon-plus',
        title: "添加权限",
        method: "showAddAuthority"
      }]
    };
  }
}