<template>
  <div class="online-people">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="全表模糊搜索"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="primary"
              icon="el-icon-s-promotion"
              class="margin-box"
              @click="kickOutAll"
              :disabled="!selectList.length"
              title="批量踢出"
              circle
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-download"
              class="margin-box"
              @click="downloadUserList"
              title="导出用户列表"
              circle
            ></el-button>
          </div>
          <el-table
            ref="onlineUserTable"
            :data="onlineUserList"
            :highlight-current-row="true"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px" class="name-wrapper">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="岗位" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.job }}</div>
              </template>
            </el-table-column>
            <el-table-column label="登录IP" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.ip }}</div>
              </template>
            </el-table-column>
            <el-table-column label="登录地点" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="浏览器" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.browser }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.loginTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="kickOut(scope.row)" size="small">踢出</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      onlineUserList: [],
      selectList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0
    };
  },
  created() {
    // 初始化页面数据
    this.getOnlineUserList();
  },
  methods: {
    getRowKey(row) {
      return row.id;
    },
    // 选择标签
    handleSelectionChange(val) {
      this.selectList = val;
    },
    // 批量踢出
    kickOutAll() {
      this.$showMsgBox({ msg: `是否踢出所选中用户?` }).then(() => {
        this.$http_json({
          url: `/auth/online/delBatch`,
          method: "post",
          data: this.selectList.map(val => val.key)
        }).then(() => {
          this.$successMsg("批量踢出成功");
          this.$refs.onlineUserTable.clearSelection()
          this.getOnlineUserList();
        });
      });
    },
    // 踢出
    kickOut(item) {
      this.$showMsgBox({ msg: `是否踢出当前用户?` }).then(() => {
        this.$http_json({
          url: `/auth/online/${item.key}`,
          method: "post"
        }).then(() => {
          this.$successMsg("踢出成功");
          this.getOnlineUserList();
        });
      });
    },
    // 导出用户列表
    downloadUserList() {
      this.$http_json({
        url: "/auth/online/download",
        responseType: "blob",
        method: "get"
      }).then(result => {
        this.$download(
          result.data,
          `在线用户列表-${this.$formDate(new Date(), true)}.xls`,
          true
        );
      });
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getOnlineUserList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getOnlineUserList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getOnlineUserList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getOnlineUserList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialOnlineUserList(list) {
      this.onlineUserList.splice(0);
      list.forEach(value => {
        this.onlineUserList.push(value);
      });
    },
    // 获取操作日志信息
    getOnlineUserList() {
      this.$http_normal({
        url: `/auth/online?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&filter=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialOnlineUserList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
