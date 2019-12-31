export default {
  methods: {
    // 是否展开全部
    isExpandAll(e) {
      this.expand = !this.expand;
      this.expand
      ? e.target.className = "el-icon-remove-outline"
      : e.target.className = "el-icon-circle-plus-outline"
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
      this.getMenuList();
    },
    // 初始化表头
    renderHeader(h, { column }) {
      return h(
        "div",
        [
          h("i", {
            class: this.expand ? "el-icon-remove-outline" : "el-icon-circle-plus-outline",
            style: {
              color: "#2196F3",
              paddingRight: "3px" 
            },
            on: {
              click: this.isExpandAll
            }
          }),
          h("span", column.label)
        ]
      )
    },
    // 删除菜单
    deleteMenuItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.name}菜单?</p><p>如果菜单包含子菜单，则会一并删除！</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/menu/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getMenuList();
        });
      });
    },
    // 显示添加菜单窗口
    showAddMenu() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 显示编辑菜单窗口
    showEditMenu() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 编辑菜单项
    editMenuItem(item) {
      const menuItem = this.$refs.form.menuForm;
      this.$refs.form.menuId = item.id;
      menuItem.name = item.name;
      menuItem.sort = item.sort;
      menuItem.path = item.path;
      menuItem.component = item.component;
      menuItem.iframe = item.iframe.toString();
      menuItem.roles = item.roles;
      menuItem.enabled = item.enabled.toString();
      menuItem.parentId = item.parentId;
      menuItem.icon = item.icon;
      this.showEditMenu();
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.getMenuList()
    },
    // 点击搜索
    search() {
      this.getMenuList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getMenuList();
    },
  }
}