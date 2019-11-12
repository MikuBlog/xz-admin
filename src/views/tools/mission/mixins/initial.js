export default {
  created() {
    // 初始化页面数据
    this.getMissionList();
  },
  methods: {
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getMissionList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getMissionList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化定时任务列表
    initialMissionList(list) {
      this.missionList.splice(0);
      list.forEach(value => {
        this.missionList.push(value);
      });
    },
    // 获取定时任务信息
    getMissionList() {
      this.$http_normal({
        url: `/api/quartz/page?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&jobName=${this.searchVal}` : ""
        }${
          this.selectType !== "" ? `&paused=${this.selectType}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialMissionList(data.content);
      });
    }
  }
}