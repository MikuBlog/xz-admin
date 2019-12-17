export default {
  created() {
    // 获取岗位字典
    this.getDictsList("job_status");
  },
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化岗位列表
    initialStationList(list) {
      this.stationList.splice(0);
      list.forEach(value => {
        this.stationList.push(value);
      });
    },
    // 获取岗位信息
    getStationList(page, size) {
      this.nowSize = size || this.nowSize
      this.$http_normal({
        url: `/api/job/page?page=${page - 1}&size=${
          this.nowSize
          }&sort=sort,asc${this.searchVal ? `&name=${this.searchVal}` : ""}${
          this.selectType.length > 0 ? `&enabled=${this.selectType}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialStationList(data.content);
      });
    },
    // 获取岗位字典
    getDictsList(dictName) {
      this.$http_json({
        url: `/api/dictDetail/page?page=0&size=9999&sort=sort,asc&dictName=${dictName}`
      }).then(result => {
        this.dicts = result.data.content;
      });
    }
  }
}