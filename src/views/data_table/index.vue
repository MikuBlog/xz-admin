<template>
  <div>
    <el-card>
      <data-table ref="dataTable" :tableConfig="tableConfig">
        <el-input
          v-model="tableConfig.requestParam.searchParam.name"
          placeholder="搜索名称"
          class="search-input margin-box"
          @keyup.native.enter="$refs.dataTable.toFirstPage"
          slot="search"
        ></el-input>
        <el-date-picker
          v-model="date"
          class="select-input margin-box"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getDate"
          slot="search"
        ></el-date-picker>
      </data-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      tableConfig: {
        // 表格是否含有斑马线
        stripe: true,
        // 表格元素是否带有边框
        border: true,
        // 选中是否高亮
        highlightCurrentRow: true,
        // 表格是否可以多选(只有多选才有批量删除)
        selection: true,
        // 表格项是否开启操作
        operation: true,
        // 操作宽度（默认100px）
        operationWidth: 100,
        // 表格固定高度
        maxHeight: 500,
        // 是否带有分页组件
        isPagination: true,
        // 搜索框右方按钮
        operationBtns: [
          { label: "搜索列表", type: "primary", icon: "el-icon-search", circle: true, class: 'margin-box', method: _ => {
            this.$refs.dataTable.search()
          }},
          { label: "刷新列表", type: "success", icon: "el-icon-refresh", circle: true, class: 'margin-box', method: _ => {
            this.date = ""
            this.$refs.dataTable.refresh()
          }},
          { label: "批量删除", type: "danger", icon: "el-icon-delete", class: 'margin-box', circle: true, method: _ => {
            this.$refs.dataTable.deleteAll()
          }} 
        ],
        // 表格表头元素
        columns: [
          {
            label: "名称",
            prop: "name",
            render: row => {
              return `<div>${row.name}</div>`;
            },
            showOverflowTooltip: true
          },
          { label: "创建时间", prop: "createTime", showOverflowTooltip: true },
        ],
        // 表格操作元素（当operation为true的时候生效）
        operations: [{ label: "查看进度", method: (row, ind) => {
          console.log(row, ind)
        }}, { label: "编辑进度", method: (row, ind) => {
          console.log(row, ind)
        }}, { label: "删除进度", method: (row, ind) => {
          this.$refs.dataTable.deleteItem(row)
        }}],
        // 请求方法
        requestParam: {
          // 请求列表url
          requestUrl: "/api/project/page",
          // 删除列表项url，只有传入该值才能删除列表项，否则只能自己编写相应的业务逻辑
          deleteUrl: "",
          // 是否在初始化时请求列表
          immediate: true,
          // 固定参数,不变的参数
          param: {
            sort: "createTime,desc",
          },
          // 搜索参数,绑定输入框
          searchParam: {
            name: ""
          },
          // 自定义请求方法
          // requestMethods: (page, size) => {},
          // 处理请求返回的列表数据
          handleVal: val => {
            return val
          }
        },
      },
    };
  },
  methods: {
    getDate() {
      this.date
      ? (this.tableConfig.requestParam.searchParam.greateCreateTime = this.$formatDate(this.date[0]),
      this.tableConfig.requestParam.searchParam.lessCreateTime = this.$formatDate(this.date[1]))
      : (
        delete this.tableConfig.requestParam.searchParam.greateCreateTime,
        delete this.tableConfig.requestParam.searchParam.lessCreateTime
      )
      this.$refs.dataTable.toFirstPage()
    },
  },
};
</script>

<style lang="scss">
</style>