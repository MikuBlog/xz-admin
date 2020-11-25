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
              @keyup.native.enter="search"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
            <el-button
              type="danger"
              icon="fa fa-user-times"
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
              @click="downloadList"
              title="导出用户列表"
              circle
            ></el-button>
          </div>
          <el-table
            ref="onlineUserTable"
            :data="onlineUserList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
            border
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div class="name-wrapper">{{ scope.row.username }}</div>
              </template>
            </el-table-column>
						<el-table-column label="昵称" :show-overflow-tooltip="true">
						  <template slot-scope="scope">
						    <div class="name-wrapper">{{ scope.row.nickname || "无" }}</div>
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
            <el-table-column label="系统" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.os }}</div>
              </template>
            </el-table-column>
            <el-table-column label="第一次登录时间" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.loginTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="kickOut(scope.row)" style="color: #f4797a">踢出</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getOnlineUserList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Initial, Operation, Property]
};
</script>

<style lang="scss" scoped>
</style>
