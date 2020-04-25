import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化砍价产品列表
		initialCombinationList(list) {
		  this.list.splice(0);
		  list.forEach(value => {
        value.imageUrl = value.cover
        ? convertHttp(value.cover)
        : ''
		    this.list.push(value);
		  });
		},
		// 获取砍价产品列表
		getCombinationList(page, size) {
		  this.$http_normal({
		    url: `/api/bargainSpu/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&name=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialCombinationList(data.content);
		  });
		},
		// 批量删除砍价产品
		deleteAllCombination() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选砍价产品进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中砍价产品?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/bargainSpu/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getCombinationList(this.nowPage, this.nowSize)
			  });
			});
		},
		// 删除砍价产品
		deleteArticle(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中砍价产品?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/bargainSpu/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getCombinationList(this.nowPage, this.nowSize)
			  });
			});
		},
		getRowKey(row) {
		  return row.id;
		},
		// 选中砍价产品
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// 添加砍价产品
		toAddCombinationPage() {
			this.$router.push({ path: "/home/add_bargain" })
		},
		// 编辑砍价产品
		toEditCombinationPage(item) {
			this.$router.push({ path: `/home/edit_bargain?id=${item.id}` })
		},
		// 重置
		refresh() {
		  this.searchVal = ""
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}