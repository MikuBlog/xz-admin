<template>
  <div class="authority-log">
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
            <el-select v-model="selectType_1" placeholder="类型" class="select-input margin-box">
              <el-option
                v-for="item in options_1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              clearable
              v-model="selectType_2"
              @change="getOperationType"
              placeholder="操作"
              class="select-input margin-box"
            >
              <el-option
                v-for="item in options_2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-model="date"
              class="select-input margin-box"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getDate"
            ></el-date-picker>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
          </div>
          <el-table :data="authorityLogList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column label="操作者">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.creatorName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.creatorIp }}</div>
              </template>
            </el-table-column>
            <el-table-column label="IP来源" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="是否恢复" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag :type="scope.row.recovery ? '' : 'info'">
                    {{ scope.row.recovery
                    ? "是"
                    : "否"}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作类型" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.type }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作值" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-refresh-left"
                  @click="recoverAuthority(scope.row)"
                  size="small"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteAuthority(scope.row)"
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
    <Detail ref="detail" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import Detail from './components/detail'
export default {
  mixins: [ Initial, Operation, Property ],
  components: { Detail }
};
</script>

<style lang="scss" scoped></style>
