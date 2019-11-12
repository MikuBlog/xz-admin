import { MessageBox } from 'mint-ui';
<template>
  <div class="redis-manage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索缓存KEY"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="danger"
              class="margin-box"
              icon="el-icon-delete"
              @click="deleteAll"
              circle
            ></el-button>
          </div>
          <el-table :data="redisList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column :show-overflow-tooltip="true" label="KEY">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.key }}</div>
              </template>
            </el-table-column>
            <el-table-column label="VALUE" width="100" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button @click="showDetail(scope.row.value)" type="text" size="small">查看详情</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRedis(scope.row)"
                  size="small"
                ></el-button>
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
    <el-dialog title="详情信息" :visible.sync="dialogVisible" width="30%">
      <span>{{redisDetail}}</span>
    </el-dialog>
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
export default {
  mixins: [ Initial, Operation, Property ]
};
</script>

<style lang="scss" scoped>
</style>
