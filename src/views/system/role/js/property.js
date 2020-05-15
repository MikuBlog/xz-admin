export default {
  data() {
    return {
      roleId: "",
      searchVal: "",
      selectType: "菜单分配",
      title: "菜单分配",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      isAdd: true,
      showButton: false,
      // 角色名称
      roleName: "",
      ids: [],
      tree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      roleList: [],
      permissions: [],
      permissionIds: [],
      menus: [],
      menuIds: []
    };
  }
}