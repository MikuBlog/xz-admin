export default {
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 选中用户
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 导出用户列表
    downloadUserList() {
      this.$http_json({
        url: "/api/user/download",
        responseType: 'blob',
        method: "get"
      }).then(result => {
        this.$download(result.data, `用户列表-${this.$formatDate(new Date(), true)}.xls`, true)
      }).catch(e => {
        this.$errorMsg(e)
      })
    },
    // 删除选中用户
    deleteAll() {
      if(this.selectList.length == 0) {
        this.$warnMsg("请勾选用户进行批量删除")
        return
      }
      this.$showMsgBox({
        msg: `<p>是否删除选中用户?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/user/delBatch`,
          method: "post",
          data: this.selectList.map(val => val.id)
        }).then(() => {
          this.$successMsg("删除成功");
          this.$refs.userTable.clearSelection()
          this.getUserList();
        });
      });
    },
    // 删除用户
    deleteUserItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.username}用户?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/user/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getUserList();
        });
      });
    },
    // 显示添加用户窗口
    showAddUser() {
      const form = this.$refs.form;
      this.isAdd = true;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
      form.resetForm();
    },
    // 显示编辑用户窗口
    showEditUser() {
      const form = this.$refs.form;
      this.isAdd = false;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
    },
    // 编辑用户项
    editUserItem(item) {
      const userItem = this.$refs.form.userForm,
        component = this.$refs.form;
      userItem.username = item.username;
      userItem.enabled = item.enabled.toString();
      userItem.phone = item.phone;
      userItem.email = item.email;
      component.userId = item.id;
      component.jobId = item.job.id;
      component.roleIds = item.roles.map(val => val.id);
      component.deptId = item.dept.id;
      component.getJobs(item.dept.id, item.job.id);
      this.showEditUser();
    },
    // 点击搜索
    search_1() {
      this.getDepartmentList();
    },
    // 回车搜索
    searchEnter_1(e) {
      e.keyCode === 13 && this.getDepartmentList();
    },
    // 点击搜索
    search_2() {
      this.selectType ? this.getUserList(1, this.nowSize) : this.$warnMsg("请选择搜索类型");
    },
    // 回车搜索
    searchEnter_2(e) {
      e.keyCode === 13 &&
        (this.selectType
          ? this.getUserList(1, this.nowSize)
          : this.$warnMsg("请选择搜索类型"));
    },
    // 搜索状态
    getStatus() {
      this.getUserList(1, this.nowSize);
    },
    handleNodeClick(val) {
      this.deptId = val.id;
      this.getUserList();
    }
  }
}