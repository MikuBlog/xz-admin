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
              @keyup.native.enter="search"
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
            <el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
            <el-button
              type="primary"
              class="margin-box"
              icon="el-icon-plus"
              @click="showAddStation"
              title="添加岗位"
              circle
            ></el-button>
						<el-button
						  type="warning"
						  icon="el-icon-download"
						  class="margin-box"
						  @click="downloadList"
						  title="导出岗位列表"
						  circle
						></el-button>
          </div>
          <el-table
            :data="stationList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%"
            highlight-current-row
            stripe
          >
            <el-table-column label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属部门" show-overflow-tooltip>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.dept.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="排序" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tag>{{ scope.row.sort }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" show-overflow-tooltip>
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
            <el-table-column label="操作" fixed="right" width="180" align="center">
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
          <pagination
            ref="pagination"
            :get-data="getStationList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <stationForm ref="form" :is-add="isAdd" :dicts="dicts" />
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
import stationForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { stationForm }
};
</script>

<style>
</style>
