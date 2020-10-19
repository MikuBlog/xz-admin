<template>
  <div>
    <div class="search">
      <slot :table="this" />
      <el-button
        v-for="(item, ind) in config.operationBtns"
        :key="ind"
        :type="item.type || ''"
        :icon="item.icon || ''"
        :class="item.class"
        @click="item.method"
        :disabled="item.disabled || false"
        :title="item.label"
        :circle="item.circle || false"
      >
        <span v-if="!item.circle">{{ item.label }}</span>
      </el-button>
    </div>
    <el-table
      :data="list"
      :header-cell-style="{
        background: '#f6f8fa'
      }"
      :default-expand-all="config.isExpandAll || false"
      :highlight-current-row="config.highlightCurrentRow || false"
      :tree-props="config.treeProps || {children: 'children', hasChildren: 'hasChildren'}"
      :stripe="config.stripe || false"
      :border="config.border || false"
      :max-height="config.maxHeight
      ? config.maxHeight
      : $store.state.tableHeight.tableHeight"
      :height="config.maxHeight
      ? config.maxHeight
      : $store.state.tableHeight.tableHeight"
      :row-key="getRowKey"
        :row-style="config.rowStyle || ( _ => {})"
      :cell-style="config.cellStyle || ( _ => {}) "
      @selection-change="arr => { selectList = arr }"
      v-loading="loading"
      ref="table"
      style="width: 100%"
    >
      <el-table-column
        v-if="config.selection || false"
        type="selection"
        width="55"
        reserve-selection
        align="center"
      />
      <el-table-column type="expand" v-if="config.columnsExpand.length">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item 
            v-for="(item, ind) in config.columnsExpand" :key="ind" 
            :label="item.label" 
            class="expand-line">
              <div v-if="item.renderHtml" v-html="item.render(props.row)"></div>
              <expand-dom v-if="item.render" :row="scope.row" :render="item.render"></expand-dom>
              <div v-if="item.prop">{{ props.row[item.prop] }}</div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, ind) in config.columns.filter(val => val.isShow)"
        :key="ind"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
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
        :resizable="config.border
        ? (item.resizable || false)
        : false"
				style="cursor: move;"
      >
        <template slot-scope="scope">
          <div v-if="item.renderHtml" v-html="item.renderHtml(scope.row, scope.index)"></div>
          <expand-dom v-if="item.render" :row="scope.row" :render="item.render"></expand-dom>
          <div v-if="item.prop">{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        v-if="config.operation"
        :width="config.operationWidth || 100"
      >
        <template slot="header">
          <div>
            <span>操作</span>
            <el-popover 
            placement="bottom" 
            width="220" 
            trigger="click"
            >
              <div class="search">
                <el-input
                  placeholder="搜索字段"
                  v-model="searchVal"
                  @keyup.native.enter="searchColumns"
                  :style="{
                      marginBottom: '5px'
                    }"
                ></el-input>
              </div>
              <div
                class="list-box"
                :style="{
                height: '250px',
                overflow: 'auto',
              }"
              >
                <draggable 
                v-model="config.columns" 
                animation="400"  
                v-if="!isChangeList">
                  <transition-group>
                    <div
                      class="list"
                      v-for="(item, ind) in config.columns.filter(val => val.isSearch)"
                      :key="ind"
                      :style="{
                        padding: '5px',
                        cursor: 'move'
                      }"
                    >
                      <el-switch
                        v-model="item.isShow"
                        :disabled="item.disabled"
                        @change="switchChange"
                        @click.native="switchClick(item)"
                      ></el-switch>
                      <span
                        :style="{
                          marginLeft: '5px',
                          fontSize: '14px'
                        }"
                      >{{ item.label }}</span>
                    </div>
                  </transition-group>
                </draggable>
              </div>
              <!-- <div
                class="button-box"
                :style="{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'right',
                background: '#f6f8fa',
                padding: '10px',
                margin: 0,
                borderTop: '1px solid #ddd'
              }"
              >
                <el-button type="primary" size="small" @click="visible = false">确认</el-button>
                <el-button type="text" size="small" @click="switchReset">重置</el-button>
              </div> -->
              <i
                slot="reference"
                class="el-icon-menu"
                style="margin: 2px 0 0 3px; cursor: pointer"
              />
            </el-popover>
          </div>
        </template>
        <template slot-scope="scope">
          <el-dropdown trigger="click" placement="bottom">
            <el-button type="text">操作</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, ind) in config.operations"
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
    <div style="text-align: right" v-if="config.isPagination">
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
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * @author xuanzai
 * @description 表格js化
 */
import Sortable from 'sortablejs'
export default {
  name: "data-table",
  components: {
    // 用于render对象
    "expand-dom": {
      functional: true,
      props: { row: Object, index: Number, render: Function },
      render: (h, ctx) => {
        const params = { row: ctx.props.row, index: ctx.props.index }
        return ctx.props.render(h, params)
      }
    }
  },
  props: {
    tableConfig: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      isChangeList: false,
      // 是否加载表格
      loading: false,
      // 筛选列表字段
      searchVal: "",
      // 列表元素
      list: [],
      // 已选择元素
      selectList: [],
      // 当前页
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      // 默认一页条数
      defaultPageSizes: [],
      // 搜索参数
      searchParam: {},
      // 配置备份
      config: {
        columns: []
      },
    };
  },
  watch: {
    // 监听tableConfig变化并响应数据
    tableConfig: {
      handler() {
        this.tableConfig.columns.forEach((val) => {
          val.isSearch = true;
        });
        this.config = $.extend(true, {}, this.tableConfig);
      },
      immediate: true,
      deep: true
    },
    // 解决vue-draggable拖拽数组不重渲染问题
    ['config.columns']() {
      this.isChangeList = true
      this.$nextTick(val => {
        this.isChangeList = false
      })
    }
  },
  created() {
    // 初始化数据
    this.init();
  },
	mounted() {
		// 开启表格拖拽排序
		this.tableConfig.isSort && this.rowDrop()
	},
  methods: {
    init() {
      // 判断是否立刻请求列表
      this.tableConfig.requestParam.immediate && this.toFirstPage();
      // 初始化查询条件
      this.searchParam = this.tableConfig.requestParam.searchParam;
      // 初始化分页列表
      this.defaultPageSizes = [
        this.nowSize,
        parseInt(this.nowSize * 2.5),
        parseInt(this.nowSize * 5),
        parseInt(this.nowSize * 10),
      ];
    },
		// 表格拖拽
		rowDrop() {
		  const tbody = document.querySelector('.el-table__body-wrapper tbody')
		  const _this = this
		  Sortable.create(tbody, {
		    onEnd({ newIndex, oldIndex }) {
		      const currRow = _this.list.splice(oldIndex, 1)[0]
		      _this.list.splice(newIndex, 0, currRow)
		      _this.sortList(_this.list[oldIndex], _this.list[newIndex], oldIndex, newIndex)
		    }
		  })
		},
		// 表格排序
		sortList(oldItem, newItem, oldIndex, newIndex) {
		  this.$http_json({
		    url: this.tableConfig.requestParam.sortUrl,
		    method: "post",
		    data: this.list.map((val, ind) => {
		      return {
		        id: val.id,
		        sort: ind + 1 + this.nowPage * this.nowSize
		      }
		    })
		  }).then(result => {
		    this.$successMsg("排序成功")
		    this.getList(this.nowPage, this.nowSize)
		  })
		},
    // 判断是否仅剩一个表格列
    switchChange() {
      let times = 0;
      this.config.columns.forEach((val) => {
        if (!val.isShow) {
          times++;
        }
      });
      if (times === this.config.columns.length - 1) {
        this.config.columns.forEach((val) => {
          if (val.isShow) {
            val.disabled = true;
          }
        });
      } else {
        this.config.columns.forEach((val) => {
          val.disabled = false;
        });
      }
    },
    // 如果仅剩一列提示处理
    switchClick(item) {
      if (item.disabled) {
        this.$warnMsg("表格最少保留一列");
      }
    },
    // 重置表格列
    // switchReset() {
    //   this.config.columns.forEach((val) => {
    //     val.isShow = true;
    //     val.disabled = false;
    //     val.isSearch = true;
    //   });
    // },
    // 搜索表格列
    searchColumns() {
      if (this.searchVal) {
        this.config.columns.forEach((val) => {
          if (val.label.indexOf(this.searchVal) !== -1) {
            val.isSearch = true;
          } else {
            val.isSearch = false;
          }
        });
      } else {
        this.config.columns.forEach((val) => {
          val.isSearch = true;
        });
      }
    },
    getRowKey(row) {
      return row.id;
    },
    // 批量删除
    deleteAll() {
      if (this.selectList.length == 0) {
        this.$warnMsg("请勾选表格项进行删除");
        return;
      }
      this.$showMsgBox({
        msg: `是否删除选中项?`,
      }).then(() => {
        this.$http_json({
          url: this.tableConfig.requestParam.deleteUrl,
          method: "post",
          data: this.selectList.map((val) => val.id),
        }).then(() => {
          this.$successMsg("删除成功");
          this.getList(this.nowPage, this.nowSize);
        });
      });
    },
    // 删除单独项
    deleteItem(item) {
      this.$showMsgBox({
        msg: `是否删除选中项?`,
      }).then(() => {
        this.$http_json({
          url: this.tableConfig.requestParam.deleteUrl,
          method: "post",
          data: [item.id],
        }).then(() => {
          this.$successMsg("删除成功");
          this.getList(this.nowPage, this.nowSize);
        });
      });
    },
    // 返回第一页
    toFirstPage() {
      this.nowPage = 1;
      this.getList(this.nowPage, this.nowSize);
    },
    // 初始化表格数据
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
    // 刷新列表，清空所有搜索参数值
    refresh() {
      Object.keys(this.searchParam).forEach((val) => {
        this.searchParam[val] = "";
      });
      this.toFirstPage();
    },
    // 刷新当前页
    refreshNowPage() {
      this.getList(this.nowPage, this.nowSize)
    },
    // 获取列表
    getList(page, size) {
      this.loading = true;
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
              ...this.searchParam,
            },
          }).then((result) => {
            this.loading = false;
            this.$refs.table.clearSelection();
            this.initialList(
              this.tableConfig.isPagination ? result.data.content : result.data
            );
            this.totalElements = result.data.totalElements;
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-box {
  .el-switch {
    transform: scale(0.9);
  }
  .list:hover {
    background: #e7edf4;
  }
}
</style>
