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
                circle
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddDepartment"
                title="添加部门"
              ></el-button>
            </el-row>
          </div>
          <tree-table 
          :expand-all="expand" 
          :data="departmentList" 
          :columns="columns" 
          :renderHeader="renderHeader"
          :stripe="true"
          size="small">
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.enabled ? '' : 'info'"
                >{{ scope.row.enabled ? "正常" : "停用" }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editDepartmentItem(scope.row)"
                  size="small"
                />
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="deleteDepartment(scope.row)"
                />
              </template>
            </el-table-column>
          </tree-table>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" :is-add="isAdd" :dicts="dicts" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import eForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { eForm }
};
</script>

<style>
</style>
