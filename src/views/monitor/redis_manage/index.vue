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
              title="批量删除"
              circle
            ></el-button>
          </div>
          <el-table
            :data="redisList"
            style="width: 100%"
            highlight-current-row
            stripe
          >
            <el-table-column :show-overflow-tooltip="true" label="KEY">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.key }}</div>
              </template>
            </el-table-column>
            <el-table-column label="VALUE" width="100" align="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-button @click="showDetail(scope.row.value)" type="text">查看详情</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" @click="deleteRedis(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getRedisList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions" @deleteAll="deleteAll" />
    <VisitDetail ref="visitDetail" />
  </div>
</template>

<script>
import VisitDetail from "./components/visit_detail";
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [Initial, Operation, Property],
  components: { VisitDetail }
};
</script>

<style lang="scss" scoped>
</style>
