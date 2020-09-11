export default {
  methods: {
    // 分页处理
    initialPage(key, val) {
      this[key] = val;
    },
    // 初始化字典列表
    initialDictionaryList(list) {
      this.dictionaryList.splice(0);
      list.forEach(value => {
        this.dictionaryList.push(value);
      });
    },
    // 获取字典信息
    getDictionaryList(page, size) {
      this.$http_normal({
        url: `/api/dict/page?page=${page - 1}&size=${
          size
          }&sort=createdAt,desc${
          this.selectType_1 ? `&${this.selectType_1}=${this.searchVal_1}` : ""
          }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage("totalElements_1", data.totalElements);
        this.initialDictionaryList(data.content);
      });
    },
    // 初始化字典详情列表
    initialDetailList(list) {
      this.detailList.splice(0);
      list.forEach(value => {
        this.detailList.push(value);
      });
    },
    // 获取字典详情信息
    getDetailList(page, size) {
      if (this.dictName) {
        this.$http_normal({
          url: `/api/dictDetail/page?page=${page - 1}&size=${
            size
            }&sort=sort,asc&dictName=${this.dictName}${
            this.searchVal_2 ? `&label=${this.searchVal_2}` : ""
            }`,
          method: "get"
        }).then(result => {
          const data = result.data;
          this.beloneDictName = this.dictName;
          this.initialPage("totalElements_2", data.totalElements);
          this.initialDetailList(data.content);
        });
      }
    },
    // 获取字典列表当行的信息，并为添加编辑字典详情作准备
    getDictName(row) {
      this.dictName = row.name;
      this.$refs.formEdit.detailForm.dict = {
        id: row.id
      };
      this.getDetailList(row.name);
    }
  }
}