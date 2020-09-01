export default {
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作类型
    initialOperationType(type) {
      switch (type) {
        case 1:
          return "用户";
        case 2:
          return "角色";
        case 3:
          return "权限";
        case 4:
          return "部门";
        case 5:
          return "岗位";
        case 6:
          return "菜单";
      }
    },
    // 初始化权限日志列表
    initialAuthorityLogList(list) {
      this.authorityLogList.splice(0);
      list.forEach(value => {
        value.type = this.initialOperationType(value.type);
        this.authorityLogList.push(value);
      });
    },
    // 获取权限日志信息
    getAuthorityLogList(page, size) {
      this.$http_normal({
        url: `/api/authLog/page?page=${page - 1}&size=${size}&sort=createTime,desc${
          this.selectType_1 ? `&${this.selectType_1}=${this.searchVal}` : ""
          }${
          this.date
            ? `&greatCreatedAt=${this.dateArray[0]}&lessCreatedAt=${this.dateArray[1]}`
            : ""
          }${this.selectType_2 ? `&type=${this.selectType_2}` : ""}`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialAuthorityLogList(data.content);
      });
    }
  }
}