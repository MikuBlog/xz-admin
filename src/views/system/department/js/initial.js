export default {
  created() {
    // 初始化获取部门列表
    this.getDepartmentList();
    // 获取岗位字典
    this.getDictsList("dept_status");
  },
  methods: {
    // 初始化部门列表
    initialDepartmentList(list) {
      this.departmentList.splice(0);
      list.forEach(value => {
        this.departmentList.push(value);
      });
    },
    // 获取部门列表
    getDepartmentList() {
      this.$http_json({
        url: `/api/dept/get?sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }${this.selectType ? `&enabled=${this.selectType}` : ""}`,
        method: "get"
      }).then(result => {
        this.initialDepartmentList(result.data.content);
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