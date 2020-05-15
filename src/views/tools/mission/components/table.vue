<template>
  <el-dialog :visible.sync="dialog" append-to-body v-dialogDrag title="执行日志" width="90%">
    <div class="search">
      <el-input
        v-model="searchVal"
        placeholder="搜索任务名称"
        class="search-input margin-box"
        @keyup.native.enter="search"
      ></el-input>
      <el-select
        v-model="selectType"
        placeholder="状态"
        clearable
        class="select-input margin-box"
        @change="search"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
      <el-button
        type="success"
        icon="el-icon-refresh"
        class="margin-box"
        @click="refresh"
        circle
        title="重置"
      ></el-button>
    </div>
    <el-table :max-height="$store.state.tableHeight.tableHeight" :data="missionLogList" style="width: 100%" highlight-current-row stripe>
      <el-table-column label="任务名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.jobName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Bean名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">{{ scope.row.beanName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="执行方法" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">{{ scope.row.methodName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="参数" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference">{{ scope.row.params }}</div>
        </template>
      </el-table-column>
      <el-table-column label="cron表达式" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.methodName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="异常状况">
        <template slot-scope="scope" show-overflow-tooltip>
          <div slot="reference" class="name-wrapper">{{ scope.row.exceptionDetail }}</div>
        </template>
      </el-table-column>
      <el-table-column label="耗时" align="center">
        <template slot-scope="scope" show-overflow-tooltip>
          <el-tag type="primary">{{ scope.row.time }}ms</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag :type="scope.row.successful ? 'success' : 'info'">
              {{ scope.row.successful
              ? '成功'
              : '失败' }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期 " width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      ref="pagination"
      :get-data="getMissionLogList"
      :now-page.sync="nowPage"
      :now-size.sync="nowSize"
      :total="totalElements"
    />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      selectType: "",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      errorInfo: "",
      dialog: false,
      missionLogList: [],
      options: [
        {
          label: "成功",
          value: true
        },
        {
          label: "失败",
          value: false
        }
      ]
    };
  },
  methods: {
    // 重置
    refresh() {
      this.searchVal = ""
      this.selectType = ""
      this.$refs.pagination.toFirstPage()
    },
    // 点击搜索
    search() {
      this.$refs.pagination.toFirstPage();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化定时任务列表
    initialMissionLogList(list) {
      this.missionLogList.splice(0);
      list.forEach(value => {
        this.missionLogList.push(value);
      });
    },
    // 获取定时任务信息
    getMissionLogList(page, size) {
      this.nowSize = size;
      this.$http_normal({
        url: `/api/quartz/jobLogs?page=${page - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&jobName=${this.searchVal}` : ""
        }${this.selectType !== "" ? `&successful=${this.selectType}` : ""}`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialMissionLogList(data.content);
      });
    }
  }
};
</script>