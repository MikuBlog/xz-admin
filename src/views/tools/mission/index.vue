<template>
  <div class="mission-manage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
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
              class="select-input margin-box"
              @change="search"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button icon="el-icon-plus" type="primary" class="margin-box" @click="addItem" circle></el-button>
            <el-button icon="el-icon-document-copy" type="warning" class="margin-box" @click="showLogList" circle></el-button>
          </div>
          <el-table :data="missionList" :highlight-current-row="true" style="width: 100%">
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
                  <div slot="reference" class="name-wrapper">{{ scope.row.cronExpression }}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <div slot="reference">
                  <el-tag :type="scope.row.paused ? 'info' : 'success'">
                    {{ scope.row.paused
                    ? '已暂停'
                    : '运行中' }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="描述">
              <template slot-scope="scope" :show-overflow-tooltip="true">
                <div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
              </template>
            </el-table-column>
            <el-table-column label="更新日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="editItem(scope.row)" size="small">编辑</el-button>
                <el-button type="text" @click="executeItem(scope.row)" size="small">执行</el-button>
                <el-button type="text" @click="recoverItem(scope.row)" size="small">{{ scope.row.paused ? '恢复' : '暂停'}}</el-button>
                <el-button type="text" @click="deleteItem(scope.row)" size="small">删除</el-button>
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
    <Form 
    ref="form" 
    :is-add="isAdd"
    @updateMissionList="getMissionList" />
    <Table 
    ref="table"/>
  </div>
</template>

<script>
import Form from './form'
import Table from './table'
export default {
  components: { Form, Table },
  data() {
    return {
      searchVal: "",
      selectType: "",
      isAdd: false,
      missionList: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      options: [
        {
          label: "已暂停",
          value: true
        },
        {
          label: "运行中",
          value: false
        }
      ]
    };
  },
  created() {
    // 初始化页面数据
    this.getMissionList();
  },
  methods: {
    // 弹出log
    showLogList() {
      this.$refs.table.dialog = true
    },
    // 恢复定时任务
    recoverItem(item) {
      this.$showMsgBox({
        msg: `<p>是否${item.paused ? '恢复' : '暂停'}${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/pause/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg(`${item.paused ? '恢复' : '暂停'}成功`);
          this.getMissionList();
        });
      });
    },
    // 执行定时任务
    executeItem(item) {
      this.$showMsgBox({
        msg: `<p>是否执行${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/exec/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("执行成功");
          this.getMissionList();
        });
      });
    },
    // 删除定时任务
    deleteItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.jobName}定时任务?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/quartz/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getMissionList();
        });
      });
    },
    // 添加定时任务
    addItem() {
      const form = this.$refs.form
      this.isAdd = true
      form.dialog = true
      form.resetForm()
    },
    // 编辑定时任务
    editItem(item) {
      const 
        missionItem = this.$refs.form.missionForm,
        form = this.$refs.form
      form.missionId = item.id
      missionItem.jobName = item.jobName
      missionItem.beanName = item.beanName
      missionItem.methodName = item.methodName
      missionItem.params = item.params
      missionItem.cronExpression = item.cronExpression
      missionItem.paused = item.paused.toString()
      missionItem.remark = item.remark
      this.isAdd = false
      form.dialog = true
    },
    // 点击搜索
    search() {
      this.getMissionList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getMissionList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getMissionList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getMissionList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化定时任务列表
    initialMissionList(list) {
      this.missionList.splice(0);
      list.forEach(value => {
        this.missionList.push(value);
      });
    },
    // 获取定时任务信息
    getMissionList() {
      this.$http_normal({
        url: `/api/quartz/page?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&jobName=${this.searchVal}` : ""
        }${
          this.selectType !== "" ? `&paused=${this.selectType}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialMissionList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
