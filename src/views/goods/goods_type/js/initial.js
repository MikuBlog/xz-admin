import convertHttp from '@/utils/convertHttp'
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
				value.imageUrl = value.image 
				? convertHttp(value.image)
				: ''
        this.goodsTypeList.push(value);
      });
    },
    // 获取菜单列表
    getGoodsTypeList() {
      this.$http_json({
        url: `/api/shop/productType/queryAll?sort=sort,asc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        this.initialGoodsTypeList(result.data.content);
      });
    }
  }
}