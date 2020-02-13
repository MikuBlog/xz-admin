import convertHttp from '@/utils/convertHttp'
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
      this.getGoodsTypeList();
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
		// 导出菜单列表
		downloadList() {
		  this.$http_json({
		    url: "/api/menu/download",
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
		deleteAllGoodsType() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选商品分类进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品分类?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/shop/productType/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getGoodsTypeList()
			  });
			});
		},
    deleteGoodsType(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.name}菜单?</p><p>如果菜单包含子菜单，则会一并删除！</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/shop/productType/del`,
          method: "post",
					data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功，刷新页面即可生效");
          this.getGoodsTypeList();
        });
      });
    },
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
    showAddBox() {
      const form = this.$refs.form
      form.dialog = true;
			form.isAdd = true
			form.getTree()
      form.form.resetForm();
    },
    showEditBox(item) {
      const form = this.$refs.form
			form.getTree()
			form.isAdd = false
			form.dialog = true;
			form.imageUrl = convertHttp(item.image)
			Object.keys(item).forEach(val => {
				if(val !== 'children' && val !== 'imageUrl') {
					form.form[val] = item[val]
				}
			})
    },
    // 重置
    refresh() {
      this.searchVal = ""
      this.getGoodsTypeList()
    },
    // 点击搜索
    search() {
      this.getGoodsTypeList();
    }
  }
}