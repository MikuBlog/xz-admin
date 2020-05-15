<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索用户名称"
              class="search-input margin-box"
              @keyup.native.enter="search"
            ></el-input>
            <el-select v-model="category" style="width: 7rem" clearable placeholder="明细种类" @change="search" class="select-input margin-box">
              <el-option
                v-for="item in options_1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="type" style="width: 7rem" clearable placeholder="明细类型" @change="search" class="select-input margin-box">
              <el-option
                v-for="item in options_2"
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
          <el-table
            ref="table"
            :data="billList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
          >
            <el-table-column prop="nickname" label="用户名" :show-overflow-tooltip="true" />
            <el-table-column prop="title" label="账单标题" :show-overflow-tooltip="true" />
            <el-table-column prop="category" label="明细种类" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.category === 'now_money'
                  ? 'success'
                  : 'warning'"
                >
                  {{ scope.row.category === 'now_money'
                  ? '余额'
                  : '积分' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="明细数字" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div class="name-wrapper">
                  {{ scope.row.pm
                  ? `+${scope.row.number}`
                  : `-${scope.row.number}` }}
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
            :get-data="getBillList"
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
import Operation from "./js/operation";
import Property from "./js/property";
export default {
  mixins: [Operation, Property]
};
</script>
