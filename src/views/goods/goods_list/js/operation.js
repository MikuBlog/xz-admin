import convertHttp from '@/utils/convertHttp'
export default {
  watch: {
    activeName() {
      this.$refs.pagination.toFirstPage()
    }
  },
	methods: {
    showSkuList(item) {
      const skuList = this.$refs.skuList
      skuList.dialog = true
      skuList.id = item.id
      skuList.getSkuList()
    },
    changeStatus(item, status) {
      this.$http_json({
        url: "/api/productSpu/status",
        method: "post",
        data: {
          id: item.id,
          showStatus: status
        }
      }).then(result => {
        this.$successMsg("修改成功")
        this.getGoodsList(this.nowPage, this.nowSize)
      })
    },
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		initialGoodsList(list) {
		  this.goodsList.splice(0);
		  list.forEach(value => {
				value.coverImage = value.cover
				? convertHttp(value.cover)
				: '',
				value.typeName = JSON.parse(value.typeName)
				value.specs = JSON.parse(value.specs)
		    this.goodsList.push(value);
		  });
		},
		getGoodsList(page, size) {
		  this.$http_normal({
		    url: `/api/productSpu/page?page=${page - 1}&size=${
		      size
          }&sort=showStatus,desc&sort=sort,asc${this.name ? `&blurry=${this.name}` : ""}${this.activeName
          !== 'null'
          ? `&${this.activeName.split(" ")[0]}=${this.activeName.split(" ")[1]}`
          : ''}`,
		    method: "get"
		  }).then(result => {
        const data = result.data;
        this.$refs.table.clearSelection()
		    this.initialPage(data.totalElements);
		    this.initialGoodsList(data.content);
		  });
		},
    deleteAllGoods() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选商品进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productSpu/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.getGoodsList(this.nowPage, this.nowSize)
			  });
			});
		},
		deleteGoods(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中商品?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productSpu/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
					this.getGoodsList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		toAddGoodsPage() {
			this.$router.push({ path: "/home/add_goods" })
		},
		toEditGoodsPage(item) {
			this.$router.push({ path: `/home/edit_goods?id=${item.id}` })
		},
		refresh() {
		  this.blurry = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}