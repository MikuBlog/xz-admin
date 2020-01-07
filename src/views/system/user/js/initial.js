export default {
  created() {
    // 初始化获取部门列表
    this.getDepartmentList();
    // 获取岗位字典
    this.getDictsList("user_status");
  },
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化用户列表
    initialUserList(list) {
      this.userList.splice(0, this.userList.length);
      list.forEach(value => {
        this.userList.push(value);
      });
    },
    // 获取用户列表信息
    getUserList(page, size) {
      this.$http_normal({
        url: `/api/user/page?page=${page - 1}&size=${
          size
        }&sort=createTime,desc&deptId=${this.deptId}${
          this.selectType ? `&${this.selectType}=${this.searchVal_2}` : ""
        }${this.selectStatus ? `&enabled=${this.selectStatus}` : ""}`,
        method: "get"
      })
        .then(result => {
          const data = result.data;
          this.initialPage(data.totalElements);
          this.initialUserList(data.content);
        })
        .catch(e => {
          this.$setMemoryPmt("token", "");
          this.$warnMsg("修改了当前账户，请重新登录");
          this.$router.push({ path: "/login" });
        });
    },
    // 初始化部门列表
    initialDepartmentList(list) {
      this.departmentList.splice(0);
      list.forEach(value => {
        this.departmentList.push(value);
      });
    },
    // 获取部门信息
    getDepartmentList() {
      this.$http_json({
        url: `/api/dept/get${
          this.searchVal_1 ? `?name=${this.searchVal_1}` : ""
        }`,
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
  },
}