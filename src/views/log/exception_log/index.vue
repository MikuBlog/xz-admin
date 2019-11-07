import { MessageBox } from 'mint-ui';
<template>
  <div class="exception-log">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="请选择类型进行搜索"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-select v-model="selectType" placeholder="类型" class="select-input margin-box">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
          </div>
          <el-table :data="exceptionLogList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="请求方法" class="expand-line">
                    <span>{{ props.row.method }}</span>
                  </el-form-item>
                  <el-form-item label="请求参数" class="expand-line">
                    <span>{{ props.row.params }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.requestIp }}</div>
              </template>
            </el-table-column>
            <el-table-column label="IP来源" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.description }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="异常详情" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button @click="showDetail(scope.row.id)" type="text" size="small">查看详情</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 25, 50, 100]"
              :page-size.sync="nowSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="详情信息" :visible.sync="dialogVisible" :fullscreen="true" width="30%">
      <span>{{exceptionDetail}}</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      selectType: "",
      exceptionLogList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      dialogVisible: false,
      exceptionDetail: "",
      options: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "description",
          label: "描述"
        }
      ]
    };
  },
  created() {
    // 初始化页面数据
    this.getExceptionLogList();
  },
  methods: {
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.selectType
        ? this.getExceptionLogList()
        : this.$warnMsg("请选择搜索类型");
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 &&
        (this.selectType
          ? this.getExceptionLogList()
          : this.$warnMsg("请选择搜索类型"));
    },
    // 显示具体错误信息
    showDetail(id) {
      this.$http_json({
        url: `/log/page/error/${id}`,
        method: "get"
      }).then(result => {
        this.dialogVisible = true;
        this.exceptionDetail = result.data;
      });
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getExceptionLogList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getExceptionLogList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化错误日志列表
    initialExceptionLogList(list) {
      this.exceptionLogList.splice(0);
      list.forEach(value => {
        this.exceptionLogList.push(value);
      });
    },
    // 获取错误日志信息
    getExceptionLogList() {
      this.$http_normal({
        url: `/log/page/error?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.selectType ? `&${this.selectType}=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialExceptionLogList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
