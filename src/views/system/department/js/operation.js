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
      this.getDepartmentList();
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
		// 导出部门列表
		downloadList() {
			this.$http_json({
			  url: "/api/dept/download",
			  responseType: 'blob',
			  method: "get"
			}).then(result => {
			  const a = document.createElement('a')
			  a.href = window.URL.createObjectURL(result.data)
			  a.click()
			}).catch(e => {
			  this.$errorMsg(e)
			})
		},
    // 删除部门
    deleteDepartment(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}部门?` }).then(() => {
        this.$http_json({
          url: `/api/dept/del`,
          method: "post",
					data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getDepartmentList();
        });
      });
    },
    // 显示添加部门窗口
    showAddDepartment() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 显示编辑部门窗口
    showEditDepartment() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 编辑部门
    editDepartmentItem(item) {
      const departmentForm = this.$refs.form.departmentForm;
      this.$refs.form.departmentId = item.id;
      departmentForm.name = item.name;
      departmentForm.enabled = item.enabled.toString();
      departmentForm.parentId = item.parentId;
      this.showEditDepartment();
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.selectType = ""
      this.getDepartmentList()
    },
    // 点击搜索
    search(val) {
      this.getDepartmentList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getDepartmentList();
    },
  }
}