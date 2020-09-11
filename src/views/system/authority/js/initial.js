export default {
  created() {
    this.getAuthorityList();
  },
  methods: {
    // 初始化权限列表
    initialAuthorityList(list) {
      this.authorityList.splice(0);
      list.forEach(value => {
        this.authorityList.push(value);
      });
    },
    // 获取权限信息
    getAuthorityList() {
      this.$http_json({
        url: `/api/permission/get?sort=createdAt,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        this.initialAuthorityList(result.data.content);
      });
    }
  }
}