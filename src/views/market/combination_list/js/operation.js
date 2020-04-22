import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    convertHttp,
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化拼团信息列表
    initialCombinationList(list) {
      this.list.splice(0);
      list.forEach(value => {
        this.list.push(value);
      });
    },
    // 获取拼团信息列表
    getCombinationList(page, size) {
      this.$http_normal({
        url: `/api/combinationPink/page?page=${page - 1}&size=${
          size
          }&sort=createTime,desc${
            this.date
              ? `&greatTime=${this.dateArray[0]}&lessTime=${this.dateArray[1]}`
              : ""
            }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialCombinationList(data.content);
      });
    },
    // 批量删除拼团信息
    deleteAllCombination() {
      if (this.selectList.length == 0) {
        this.$warnMsg("请勾选拼团信息进行批量删除")
        return
      }
      this.$showMsgBox({
        msg: `<p>是否删除选中拼团信息?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/combinationPink/del`,
          method: "post",
          data: this.selectList.map(val => val.id)
        }).then(() => {
          this.$successMsg("删除成功");
          this.$refs.table.clearSelection()
          this.getCombinationList(this.nowPage, this.nowSize)
        });
      });
    },
    // 删除拼团信息
    deleteArticle(item) {
      this.$showMsgBox({
        msg: `<p>是否删除选中拼团信息?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/combinationPink/del`,
          method: "post",
          data: [item.id]
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
    // 选中拼团信息
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 添加拼团信息
    toAddCombinationPage() {
      this.$router.push({ path: "/home/add_combination" })
    },
    // 编辑拼团信息
    toEditCombinationPage(item) {
      this.$router.push({ path: `/home/edit_combination?id=${item.id}` })
    },
    // 重置
    refresh() {
      this.date = ""
      this.dateArray = []
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage()
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
    }
  }
}