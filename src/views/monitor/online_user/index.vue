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
            :stripe="true"
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
                <el-button type="text" @click="kickOut(scope.row)">踢出</el-button>
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
    <operation-box
      :options="buttonOptions"
      @deleteAll="deleteAll"
      @downloadUserList="downloadUserList"
    />
  </div>
</template>

<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [Initial, Operation, Property]
};
</script>

<style lang="scss" scoped>
</style>
