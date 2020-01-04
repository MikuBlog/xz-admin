export default {
  methods: {
    // 添加字典
    addDictionary() {
      this.isAdd_1 = true;
      this.$refs.formAdd.addForm.name = "";
      this.$refs.formAdd.addForm.remark = "";
      this.showAddBox();
    },
    // 添加详情
    addDetail() {
      if (!this.dictName) {
        this.$warnMsg("请选择字典再进行操作");
        return;
      }
      this.isAdd_2 = true;
      this.$refs.formEdit.detailForm.label = "";
      this.$refs.formEdit.detailForm.value = "";
      this.$refs.formEdit.detailForm.sort = 0;
      this.showDetailBox();
    },
    // 编辑字典
    editDictionary(item) {
      this.isAdd_1 = false;
      this.$refs.formAdd.id = item.id;
      this.$refs.formAdd.addForm.name = item.name;
      this.$refs.formAdd.addForm.remark = item.remark;
      this.showAddBox();
    },
    // 编辑字典详情
    editDetail(item) {
      this.isAdd_2 = false;
      this.$refs.formEdit.id = item.id;
      this.$refs.formEdit.detailForm.label = item.label;
      this.$refs.formEdit.detailForm.value = item.value;
      this.$refs.formEdit.detailForm.sort = item.sort;
      this.showDetailBox()
    },
		// 导出字典
		downloadList() {
			this.$http_json({
			  url: "/api/dict/download",
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
    // 删除字典
    deleteDictionary(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}字典?` }).then(() => {
        this.$http_json({
          url: `/api/dict/del`,
          method: "post",
					data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getDictionaryList();
        });
      });
    },
    // 删除字典详情
    deleteDetail(item) {
      this.$showMsgBox({ msg: `是否删除${item.label}字典详情?` }).then(() => {
        this.$http_json({
          url: `/api/dictDetail/del`,
          method: "post",
					data: [ item.id ] 
        }).then(result => {
          this.$successMsg("删除成功");
          this.getDetailList();
        });
      });
    },
    // 显示添加字典弹框
    showAddBox() {
      this.$refs.formAdd.isShowAddBox = true;
    },
    // 显示添加字典详情弹框
    showDetailBox() {
      this.$refs.formEdit.isShowDetailBox = true;
    },
    // 重置
    refresh_1() {
      this.searchVal_1 = ""
      this.selectType_1 = ""
      this.$refs.pagination_1.toFirstPage()
    },
    refresh_2() {
      this.searchVal_2 = ""
      this.$refs.pagination_2.toFirstPage()
    },
    // 回车搜索
    searchEnter_1(e) {
      e.keyCode === 13 &&
        (this.selectType_1
          ? this.$refs.pagination_1.toFirstPage()
          : this.$warnMsg("请选择搜索类型"));
    },
    searchEnter_2(e) {
      e.keyCode === 13 && this.$refs.pagination_2.toFirstPage()
    },
    // 点击搜索
    search_1() {
      this.selectType_1
        ? this.$refs.pagination_1.toFirstPage()
        : this.$warnMsg("请选择搜索类型");
    },
    search_2() {
      this.$refs.pagination_2.toFirstPage()
    },
  }
}