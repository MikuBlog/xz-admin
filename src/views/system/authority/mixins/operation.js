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
      this.getAuthorityList();
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
    // 删除权限
    deleteAuthorityItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.name}权限?</p><p>如果权限中包含子权限，则会一并删除！</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/permission/del`,
          method: "post",
					data: [ item.id ] 
        }).then(() => {
          this.$successMsg("删除成功");
          this.getAuthorityList();
        });
      });
    },
    // 显示添加权限窗口
    showAddAuthority() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 显示编辑权限窗口
    showEditAuthority() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 编辑权限项
    editAuthorityItem(item) {
      const authorityItem = this.$refs.form.authorityForm;
      this.$refs.form.authorityId = item.id;
      authorityItem.name = item.name;
      authorityItem.alias = item.alias;
      authorityItem.parentId = item.parentId;
      this.showEditAuthority();
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.getAuthorityList()
    },
    // 点击搜索
    search() {
      this.getAuthorityList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getAuthorityList();
    }
  }
}