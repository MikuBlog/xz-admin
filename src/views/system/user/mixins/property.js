export default {
  data() {
    return {
      searchVal_1: "",
      searchVal_2: "",
      selectType: "",
      selectStatus: "",
      isAdd: true,
      dicts: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      // 部门编号
      deptId: 1,
      departmentList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      options_1: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "email",
          label: "邮箱"
        }
      ],
      options_2: [
        {
          value: "true",
          label: "激活"
        },
        {
          value: "false",
          label: "锁定"
        }
      ],
      userList: [],
      selectList: [],
      buttonOptions: [{
        icons: 'el-icon-plus',
        title: "添加新用户",
        method: "showAddUser"
      }, {
        type: "danger",
        icons: 'el-icon-delete',
        title: "批量删除",
        method: "deleteAll"
      }, {
        type: "warning",
        icons: 'el-icon-download',
        title: "导出用户列表",
        method: "downloadUserList",
      }]
    };
  }
}