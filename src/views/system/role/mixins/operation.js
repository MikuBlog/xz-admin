export default {
  methods: {
    // 删除角色
    deleteRole(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}角色?` }).then(() => {
        this.$http_json({
          url: `/api/role/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getDictionaryList();
        });
      });
    },
    // 添加角色弹窗
    showAddRole() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 编辑角色弹窗
    showEditRole() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 保存菜单
    saveMenu() {
      const role = { id: this.roleId, menus: [] };
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        const permission = { id: data.id };
        role.menus.push(permission);
      });
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data };
        role.menus.push(permission);
      });
      this.$http_json({
        url: "/api/role/updateMenu",
        method: "post",
        data: role
      }).then(() => {
        this.$successMsg("保存成功");
        this.updateRole();
      });
    },
    // 保存权限
    savePermission() {
      const role = { id: this.roleId, permissions: [] };
      this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data };
        role.permissions.push(permission);
      });
      this.$http_json({
        url: "/api/role/updatePermission",
        method: "post",
        data: role
      }).then(() => {
        this.$successMsg("保存成功");
        this.updateRole();
      });
    },
    // 编辑角色
    editRoleItem(item) {
      const roleItem = this.$refs.form.roleForm,
        component = this.$refs.form;
      this.$refs.form.roleId = item.id;
      roleItem.name = item.name;
      roleItem.remark = item.remark;
      roleItem.level = item.level;
      roleItem.dataScope = item.dataScope;
      component.deptIds = item.depts.map(val => val.id);
      component.changeScope();
      this.showEditRole();
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.$refs.pagination.toFirstPage()
    },
  }
}