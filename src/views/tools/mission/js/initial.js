export default {
  methods: {
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
    getMissionList(page, size) {
      this.$http_normal({
        url: `/api/quartz/page?page=${page - 1}&size=${
          size
        }&sort=createdAt,desc${
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