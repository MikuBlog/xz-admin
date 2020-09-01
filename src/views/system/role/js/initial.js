export default {
  created() {
    // 初始化选项列表
    this.getMenuTree();
    this.getAuthorityTree();
  },
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化角色列表
    initialRoleList(list) {
      this.roleList.splice(0);
      list.forEach(value => {
        this.roleList.push(value);
      });
    },
    // 初始化权限选中
    initialRoleCheck(item) {
      item.permissions.forEach(val => {
        this.permissionIds.push(val.id);
      });
    },
    // 初始化菜单选中
    initialMenuCheck(item) {
      item.menus.forEach((val, ind) => {
        let add = true;
        for (let i = 0; i < item.menus.length; i++) {
          if (val.id === item.menus[i].parentId) {
            add = false;
            break;
          }
        }
        if (add) {
          this.menuIds.push(val.id);
        }
      });
    },
    // 清空选项
    clearCheck() {
      this.menuIds = [];
      this.permissionIds = [];
      this.$refs.menu.setCheckedKeys([]);
      this.$refs.permission.setCheckedKeys([]);
    },
    // 更新单个用户的数据
    updateRole() {
      this.$http_json({
        url: `/api/role/get/${this.roleId}`,
        method: "get"
      }).then(result => {
        this.getRoleItem(result.data);
        this.getRoleList();
      });
    },
    // 点击表格项
    getRoleItem(item) {
      this.roleName = item.name;
      this.roleId = item.id;
      this.showButton = true;
      this.clearCheck();
      this.initialMenuCheck(item);
      this.initialRoleCheck(item);
    },
    // 获取菜单列表
    getMenuTree() {
      this.$http_json({
        url: "/api/menu/tree",
        method: "get"
      }).then(result => {
        this.menus = result.data;
      });
    },
    // 获取角色列表
    getAuthorityTree() {
      this.$http_json({
        url: "/api/permission/tree",
        method: "get"
      }).then(result => {
        this.permissions = result.data;
      });
    },
    // 获取角色信息
    getRoleList(page, size) {
      this.$http_normal({
        url: `/api/role/page?page=${page - 1}&size=${
          size
          }&sort=createdAt,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialRoleList(data.content);
      });
    }
  }
}