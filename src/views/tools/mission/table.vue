<template>
  <el-dialog :visible.sync="dialog" append-to-body title="执行日志" width="90%">
    <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索任务名称"
              class="search-input margin-box"
              @keyup.native="searchEnter"
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
      </div>
    <el-table :data="missionLogList" :highlight-current-row="true" style="width: 100%">
            <el-table-column label="任务名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.jobName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="Bean名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.beanName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="执行方法" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.methodName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="参数" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.params }}</div>
              </template>
            </el-table-column>
            <el-table-column label="cron表达式" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">{{ scope.row.methodName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="异常状况">
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <div slot="reference" class="name-wrapper">{{ scope.row.exceptionDetail }}</div>
              </template>
            </el-table-column>
            <el-table-column label="耗时" align="center">
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <el-tag type="primary" size="small">
                  {{ scope.row.time }}ms
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <div slot="reference">
                  <el-tag :type="scope.row.successful ? 'success' : 'info'" size="small">
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
    <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[5, 10, 15, 20]"
              :page-size.sync="nowSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements"
            ></el-pagination>
    </div>
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
      errorInfo: '',
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
    }
  },
  created() {
    this.getMissionLogList()
  },
  methods: {
    // 点击搜索
    search() {
      this.getMissionLogList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getMissionLogList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getMissionLogList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getMissionLogList();
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
    getMissionLogList() {
      this.$http_normal({
        url: encodeURI(`/api/quartz/jobLogs?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&jobName=${this.searchVal}` : ""
        }${
          this.selectType !== "" ? `&successful=${this.selectType}` : ""
        }`),
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialMissionLogList(data.content);
      });
    }
  }
}
</script>