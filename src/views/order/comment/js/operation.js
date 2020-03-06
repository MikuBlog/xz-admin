import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化评论列表
		initialCommentList(list) {
		  this.commentList.splice(0);
		  list.forEach(value => {
        let imageList = JSON.parse(value.picUrls)
        value.imageList = imageList.length
        ? imageList.map(val => {
          return convertHttp(val)
        })
        : ''
		    this.commentList.push(value);
		  });
		},
		// 获取评论列表
		getCommentList(page, size) {
		  this.$http_normal({
		    url: `/api/productReply/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.nickname ? `&nickname=${this.nickname}` : ""}${this.productName ? `&productName=${this.productName}` : ""}${this.content ? `&content=${this.content}` : ""}${
            this.date
              ? `&greatCreateTime=${this.dateArray[0]}&lessCreateTime=${this.dateArray[1]}`
              : ""
            }`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialCommentList(data.content);
		  });
		},
		// 批量删除评论
		deleteAllComment() {
			if (this.selectList.length == 0) {
			  this.$warnMsg("请勾选评论进行批量删除")
			  return
			}
			this.$showMsgBox({
			  msg: `<p>是否删除选中评论?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productReply/del`,
			    method: "post",
			    data: this.selectList.map(val => val.id)
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
			    this.getCommentList(this.nowPage, this.nowSize)
			  });
			});
    },
    // 回复评论
    replyComment(item) {
      const form = this.$refs.form
      form.form.id = item.id
      form.dialog = true
    },
		// 删除评论
		deleteComment(item) {
			this.$showMsgBox({
			  msg: `<p>是否删除选中评论?</p>`,
			  isHTML: true
			}).then(() => {
			  this.$http_json({
			    url: `/api/productReply/del`,
			    method: "post",
			    data: [ item.id ]
			  }).then(() => {
			    this.$successMsg("删除成功");
			    this.$refs.table.clearSelection()
					this.getCommentList(this.nowPage, this.nowSize)
			  });
			});
    },
    // 日期格式化
    initialDate() {
      this.dateArray.splice(0, this.dateArray.length);
      this.date &&
        this.dateArray.push(
          this.$formatDate(this.date[0], true),
          this.$formatDate(this.date[1], true)
        );
    },
    // 获取日期
    getDate() {
      this.initialDate();
      this.$refs.pagination.toFirstPage()
    },
		getRowKey(row) {
		  return row.id;
		},
		// 选中评论
		handleSelectionChange(val) {
		  this.selectList = val;
		},
		// 添加评论
		toAddArticlePage() {
			this.$router.push({ path: "/home/add_article" })
		},
		// 编辑评论
		toEditArticlePage(item) {
			this.$router.push({ path: `/home/edit_article?id=${item.id}` })
		},
		// 重置
		refresh() {
      this.nickname = ""
      this.productName = ""
      this.content = ""
      this.date = ""
      this.dateArray = []
		  this.$refs.pagination.toFirstPage()
		},
		// 点击搜索
		search() {
		  this.$refs.pagination.toFirstPage()
		}
	}
}