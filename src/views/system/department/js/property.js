export default {
  data() {
    return {
      isShow: true,
      expand: true,
      delLoading: false,
      searchVal: "",
      selectType: "",
      isAdd: true,
      dicts: [],
      departmentList: [],
      options: [
        {
          value: "true",
          label: "正常"
        },
        {
          value: "false",
          label: "禁用"
        }
      ]
    };
  }
}