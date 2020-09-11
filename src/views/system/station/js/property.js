export default {
  data() {
    return {
      stationList: [],
      dicts: [],
      isAdd: true,
      options: [
        {
          value: "true",
          label: "正常"
        },
        {
          value: "false",
          label: "禁用"
        }
      ],
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
        // // 表格固定高度
        // maxHeight: 500,
        // 是否带有分页组件
        isPagination: true,
        // 是否默认展开全部子项
        isExpandAll: false,
        // 渲染子项字段
        treeProps: {
          children: 'children', 
          hasChildren: 'hasChildren'
        },
        // 搜索框右方按钮
        operationBtns: [
          { label: "搜索列表", type: "primary", icon: "el-icon-search", circle: true, class: 'margin-box', method: _ => {
            this.$refs.dataTable.search()
          }},
          { label: "刷新列表", type: "success", icon: "el-icon-refresh", circle: true, class: 'margin-box', method: _ => {
            this.date = ""
            this.$refs.dataTable.refresh()
          }},
          { label: "导出列表", type: "warning", icon: "el-icon-download", class: 'margin-box', circle: true, method: this.downloadList},
          { label: "批量删除", type: "danger", icon: "el-icon-delete", class: 'margin-box', circle: true, method: _ => {
            this.$refs.dataTable.deleteAll()
          }}
        ],
        // 表格展开项
        columnsExpand: [],
        // 表格表头元素
        columns: [
          {
            label: "名称",
            prop: "name",
            showOverflowTooltip: true,
            isShow: true
          },
          { 
            label: "所属部门", 
            showOverflowTooltip: true, 
            isShow: true,
            renderHtml: row => {
              return `<div class="name-wrapper">${ row.dept.name }</div>`
            } },
          {
            label: "排序",
            isShow: true,
            align: 'center',
            render: (h, param) => {
              return h('el-tag', {
                props: {
                  type: 'primary'
                }
              }, param.row.sort)
            } 
          },
          {
            label: "状态",
            isShow: true,
            align: 'center',
            render: (h, param) => {
              return h('el-tag', {
                props: {
                  type: param.row.enabled ? '' : 'info'
                }
              }, param.row.enabled ? "正常" : "禁用")
            } 
          },
          {
            label: "创建时间",
            prop: "createdAt",
            width: "180",
            isShow: true
          },
        ],
        // 表格操作元素（当operation为true的时候生效）
        operations: [{ label: "编辑部门", method: this.editStationItem}, { label: "删除部门", method: this.deleteStation}],
        // 请求方法
        requestParam: {
          // 请求列表url
          requestUrl: "/api/job/page",
          // 删除列表项url，只有传入该值才能删除列表项，否则只能自己编写相应的业务逻辑
          deleteUrl: "/api/job/del",
          // 是否在初始化时请求列表
          immediate: true,
          // 固定参数,不变的参数
          param: {
            sort: "createdAt,desc",
          },
          // 搜索参数,绑定输入框,点击刷新按钮会清空搜索值
          searchParam: {
            name: "",
            enabled: ""
          },
          // 自定义请求方法
          // requestMethods: (page, size) => {},
          // 处理请求返回的列表数据
          handleVal: val => {
            return val
          }
        },
      }
    };
  }
}