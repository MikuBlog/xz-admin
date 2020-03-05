import convertHttp from '@/utils/convertHttp'
export default {
	methods: {
		// 分页处理
		initialPage(totalElements) {
		  this.totalElements = totalElements;
		},
		// 初始化等级任务列表
		initialUserList(list) {
		  this.userList.splice(0);
		  list.forEach(value => {
        value.imageUrl = value.avatar
        ? convertHttp(value.avatar)
        : ''
		    this.userList.push(value);
		  });
		},
		// 获取等级任务列表
    getUserList(page, size) {
		  this.$http_normal({
		    url: `/api/userInfo/page?page=${page - 1}&size=${
		      size
		      }&sort=createTime,desc${this.searchVal ? `&blurry=${this.searchVal}` : ""}`,
		    method: "get"
		  }).then(result => {
		    const data = result.data;
		    this.initialPage(data.totalElements);
		    this.initialUserList(data.content);
		  });
    },
    changeStatus(item, status) {
      this.$http_json({
        url: "/api/userInfo/edit",
        method: "post",
        data: { uid: item.uid, status }
      }).then(result => {
        this.$successMsg(status === '1'
        ? '启用成功'
        : '冻结成功');
        this.getUserList(
          this.nowPage,
          this.nowSize
        );
      });
    },
		getRowKey(row) {
		  return row.id;
		},
		// 选中等级任务
		handleSelectionChange(val) {
		  this.selectList = val;
    },
    showEditMoneyBox(item) {
      const form = this.$refs.money
      form.dialog = true
      form.form.uid = item.uid
    },
    showEditBox(item) {
      const form = this.$refs.form
      form.dialog = true
      form.isAdd = false
      form.form.uid = item.uid
      form.getDetail()
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