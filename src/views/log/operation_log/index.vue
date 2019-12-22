<template>
  <div class="operation-log">
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
          <el-table
            class="table"
            :data="operationLogList"
            style="width: 100%"
            highlight-current-row
            stripe
          >
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
                <div slot="reference" class="name-wrapper">{{ scope.row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.description }}</div>
              </template>
            </el-table-column>
            <el-table-column label="请求耗时" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.time }}ms</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getOpertionLogList"
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
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [Initial, Operation, Property]
};
</script>

<style lang="scss" scoped>
</style>
