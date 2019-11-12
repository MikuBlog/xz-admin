export default {
  data() {
    return {
      expand: true,
      delLoading: false,
      searchVal: "",
      selectVal: "",
      isAdd: true,
      columns: [
        {
          text: "名称",
          value: "name"
        }
      ],
      authorityList: []
    };
  }
}