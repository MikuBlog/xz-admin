<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索优惠券名称"
              class="search-input margin-box"
              @keyup.native.enter="search"
            ></el-input>
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
            :data="couponRecordList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
          >
            <el-table-column prop="couponTitle" label="优惠券名称" :show-overflow-tooltip="true" />
            <el-table-column prop="nickname" label="所属用户" :show-overflow-tooltip="true" />
            <el-table-column
              prop="couponPrice"
              label="优惠券面值(元)"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              prop="useMinPrice"
              label="优惠券最低消费(元)"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="startTimeDate"
              label="优惠券开始时间"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="endTimeDate"
              label="优惠券结束时间"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column prop="type" label="获取方式" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="是否可用" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.onFail ? 'primary' : 'info'"
                >{{ scope.row.onFail ? '可用' : '不可用' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 0 
              ? 'info' 
              : scope.row.status === 1
              ? 'primary'
              : 'danger'"
                >
                  {{ scope.row.status === 0
                  ? '未使用'
                  : scope.row.status === 1
                  ? '已使用'
                  : '已过期' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getCouponRecordList"
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
