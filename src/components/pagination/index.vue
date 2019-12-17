<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 25, 50, 100]"
      :pager-count="5"
      :small="this.defaultConfig.paginationSize"
      :layout="this.defaultConfig.paginationLayout"
      :current-page.sync="currentPage"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
/**
 * @author xuanzai
 * @description 二次封装分页组件，提高开发效率
 */
export default {
  name: "pagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    getData: {
      type: Function,
      default: () => {}
    },
  },
  watch: {
    total() {
      this.currentPage = 1
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    // 初始化数据
    this.getData(this.currentPage, this.pageSize)
  },
  methods: {
    handleSizeChange(size) {
      this.currentPage = 1
      this.pageSize = size
      this.getData(this.currentPage, this.pageSize)
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getData(this.currentPage, this.pageSize)
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  text-align: right;
}  
</style>