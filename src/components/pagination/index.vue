<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="defaultPageSizes"
      :pager-count="5"
      :small="this.defaultConfig.paginationSize"
      :layout="this.defaultConfig.paginationLayout"
			:page-size.sync="pageSize"
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
    nowPage: {
      type: Number,
      default: 1
    },
    nowSize: {
      type: Number,
      default: 10
    },
    isInit: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    nowPage(val) {
      this.currentPage = val
    },
    currentPage(val) {
      this.$emit("update:nowPage", val)
    },
    pageSize(val) {
      this.$emit("update:nowSize", val)
    }
  },
  data() {
    return {
      currentPage: this.nowPage,
      pageSize: this.nowSize,
      defaultPageSizes: [this.nowSize, parseInt(this.nowSize * 2.5), parseInt(this.nowSize * 5), parseInt(this.nowSize * 10)]
    }
  },
  created() {
    // 初始化数据
    this.isInit && this.getData(this.currentPage, this.pageSize)
  },
  methods: {
    // 跳转到第一页
    toFirstPage() {
      this.currentPage = 1
      this.getData(this.currentPage, this.pageSize)
    },
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