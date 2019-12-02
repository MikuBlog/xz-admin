<template>
  <div class="station-manage">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索岗位名称"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-select
              v-model="selectType"
              @change="search"
              placeholder="类型"
              clearable
              class="select-input margin-box"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="primary"
              class="margin-box"
              icon="el-icon-plus"
              @click="showAddStation"
              title="添加岗位"
              circle
            ></el-button>
          </div>
          <el-table :data="stationList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column label="名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属部门" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.dept.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="排序" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.sort }}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    :type="scope.row.enabled ? '' : 'info'"
                  >{{ scope.row.enabled ? "正常" : "禁用"}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editStationItem(scope.row)"
                  class="margin-box"
                  
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteStation(scope.row)"
                  class="margin-box"
                  
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
    <stationForm ref="form" :is-add="isAdd" :dicts="dicts"/>
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import stationForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { stationForm }
};
</script>

<style>
</style>
