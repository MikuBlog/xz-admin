import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化图片列表
    initialPictureList(list) {
      this.pictureList.splice(0);
      list.forEach(value => {
        value.url = convertHttp(value.url)
        this.pictureList.push(value);
      });
    },
    // 获取图片列表
    getPictureList(page, size) {
      this.$http_normal({
        url: `/api/picture/page?page=${page - 1}&size=${size}&sort=id,desc${
          this.searchVal ? `&filename=${this.searchVal}` : ""
          }`
        ,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.$refs.pictureTable.clearSelection()
        this.initialPage(data.totalElements);
        this.initialPictureList(data.content);
      });
    }
  }
}