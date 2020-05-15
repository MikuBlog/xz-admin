export default {
  created() {
    // 初始化获取菜单列表
    this.getMenuList();		
  },
  methods: {
    // 初始化菜单列表
    initialMenuList(list) {
			this.$sortList(list, 'sort')
      this.menuList.splice(0);
      list.forEach(value => {
        this.menuList.push(value);
      });
    },
    // 获取菜单列表
    getMenuList() {
      this.$http_json({
        url: `/api/menu/get?sort=sort,asc${
          this.searchVal ? `&name=${this.searchVal}` : ""
          }`,
        method: "get"
      }).then(result => {
        this.initialMenuList(result.data.content);
      });
    }
  }
}