export default {
  created() {
    // 初始化获取菜单列表
    this.getGoodsTypeList();
  },
  methods: {
    // 初始化菜单列表
    initialGoodsTypeList(list) {
      this.goodsTypeList.splice(0);
      list.forEach(value => {
        this.goodsTypeList.push(value);
      });
    },
    // 获取菜单列表
    getGoodsTypeList() {
      this.$http_json({
        url: `/api/menu/get?sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        this.initialGoodsTypeList(result.data.content);
      });
    }
  }
}