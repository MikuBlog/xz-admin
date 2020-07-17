<template>
  <div class="department-manage">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal"
                placeholder="请选择类型进行搜索"
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
                circle
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddDepartment"
                title="添加部门"
              ></el-button>
							<el-button
							  type="warning"
							  icon="el-icon-download"
							  class="margin-box"
							  @click="downloadList"
							  title="导出部门列表"
							  circle
							></el-button>
            </el-row>
          </div>
          <el-table
            :data="departmentList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            v-if="isShow"
            :default-expand-all="expand"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            highlight-current-row
            stripe
            border
          >
            <el-table-column prop="name" label="名称" :render-header="renderHeader">
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.enabled ? '' : 'info'"
                >{{ scope.row.enabled ? "正常" : "停用" }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip width="180" prop="createTime" label="创建日期">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editDepartmentItem(scope.row)"
                />
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteDepartment(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" :is-add="isAdd" :dicts="dicts" />
  </div>
</template>

<script>
import Initial from './js/initial'
import Operation from './js/operation'
import Property from './js/property'
import eForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { eForm }
};
</script>

<style>
</style>
