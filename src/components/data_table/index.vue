<template>
  <div>
    <div class="search">
      <slot name="search" />
      <el-button
        v-for="(item, ind) in tableConfig.operationBtns"
        :key="ind"
        :type="item.type || ''"
        :icon="item.icon || ''"
        :class="item.class"
        @click="item.method"
        :disabled="item.disabled || false"
        :title="item.label"
        :circle="item.circle || false"
      ><span v-if="!item.circle">{{ item.label }}</span></el-button>
    </div>
    <el-table
      :data="list"
      :highlight-current-row="tableConfig.highlightCurrentRow || false"
      :stripe="tableConfig.stripe || false"
      :border="tableConfig.border || false"
      :max-height="tableConfig.maxHeight
      ? tableConfig.maxHeight
      : $store.state.tableHeight.tableHeight"
      :row-key="getRowKey"
      :row-style="tableConfig.rowStyle || ( _ => {})"
      :cell-style="tableConfig.cellStyle || ( _ => {}) "
      @selection-change="arr => { selectList = arr }"
      ref="table"
      style="width: 100%"
    >
      <el-table-column
        v-if="tableConfig.selection || false"
        type="selection"
        width="55"
        reserve-selection
      />
      <el-table-column
        v-for="(item, ind) in tableConfig.columns"
        :key="ind"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :render-header="item.renderHeader || ((h, { column, $index }) => {
          return column.label
        })"
        :sortable="item.sortable || false"
        :show-overflow-tooltip="item.showOverflowTooltip || false"
        :align="item.align || 'left'"
        :sort-method="item.sortable
        ? item.sortMethod
        : ( _ => {})"
        :sort-by="item.sortable
        ? item.sortBy
        : ''"
        :resizable="tableConfig.border
        ? (item.resizable || false)
        : false"
      >
        <template slot-scope="scope">
          <div v-if="item.render" v-html="item.render(scope.row)"></div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="tableConfig.operation"
        :width="tableConfig.operationWidth || 100"
      >
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom">
            <el-button type="text">操作</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, ind) in tableConfig.operations"
                :key="ind"
                @click.native="item.method(scope.row, scope.$index)"
              >
                <el-button type="text">{{ item.label }}</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        @size-change="getList(nowPage, $event)"
        @current-change="getList($event, nowSize)"
        :page-sizes="defaultPageSizes"
        :pager-count="5"
        :small="this.defaultConfig.paginationSize"
        :layout="this.defaultConfig.paginationLayout"
        :page-size.sync="nowSize"
        :current-page.sync="nowPage"
        :total="totalElements"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * @author xuanzai
 * @description 表格js化
 */
export default {
  name: "data-table",
  props: {
    tableConfig: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      list: [],
      selectList: [],
      nowPage: 1,
      nowSize: 10,
      totalElements: 0,
      defaultPageSizes: [],
      searchParam: {},
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 判断是否立刻请求列表
      this.tableConfig.requestParam.immediate && this.toFirstPage()
      // 初始化查询条件
      this.searchParam = this.tableConfig.requestParam.searchParam
      // 初始化分页列表
      this.defaultPageSizes = [
        this.nowSize,
        parseInt(this.nowSize * 2.5),
        parseInt(this.nowSize * 5),
        parseInt(this.nowSize * 10),
      ]
    },
    getRowKey(row) {
      return row.id;
    },
    // 批量删除
    deleteAll() {
      if(this.selectList.length == 0) {
        this.$warnMsg("请勾选表格项进行删除")
        return
      }
      this.$showMsgBox({ msg: `是否删除选中项?` }).then(() => {
        this.$http_json({
          url: this.tableConfig.requestParam.deleteUrl,
          method: "post",
          data: this.selectList.map(val => val.id)
        }).then(() => {
          this.$successMsg("删除成功");
          this.getList(this.nowPage, this.nowSize)
        });
      });
    },
    deleteItem(item) {
      this.$showMsgBox({ msg: `是否删除选中项?` }).then(() => {
        this.$http_json({
          url: this.tableConfig.requestParam.deleteUrl,
          method: "post",
          data: [ item.id ]
        }).then(() => {
          this.$successMsg("删除成功");
          this.getList(this.nowPage, this.nowSize)
        });
      });
    },
    toFirstPage() {
      this.nowPage = 1;
      this.getList(this.nowPage, this.nowSize);
    },
    initialList(list) {
      this.list.splice(0);
      list.forEach((val) => {
        this.list.push(
          this.tableConfig.requestParam.handleVal
            ? this.tableConfig.requestParam.handleVal(val)
            : val
        );
      });
    },
    refresh() {
      Object
        .keys(this.searchParam)
        .forEach(val => {
          this.searchParam[val] = ""
        })
      this.toFirstPage()
    },
    getList(page, size) {
      this.tableConfig.requestParam.requestMethods
        ? this.tableConfig.requestParam.requestMethods(
            this.nowPage,
            this.nowSize
          )
        : this.$http_normal({
            url: this.tableConfig.requestParam.requestUrl,
            method: "get",
            params: {
              page: page - 1,
              size,
              ...this.tableConfig.requestParam.param,
              ...this.searchParam
            }
          }).then((result) => {
            this.$refs.table.clearSelection()
            this.initialList(
              this.tableConfig.isPagination ? result.data.content : result.data
            );
            this.totalElements = result.data.totalElements;
          });
    },
  },
};
</script>