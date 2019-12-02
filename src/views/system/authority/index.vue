<template>
  <div class="authority-manage">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal"
                placeholder="搜索权限名称"
                class="search-input margin-box"
                @keyup.native="searchEnter"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button
                circle
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddAuthority()"
                title="添加权限"
              ></el-button>
            </el-row>
          </div>
          <tree-table 
          :data="authorityList" 
          :expand-all="expand" 
          :columns="columns" 
          :renderHeader="renderHeader"
          :stripe="true"
          size="small">
            <el-table-column prop="alias" label="别名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span>{{scope.row.alias}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editAuthorityItem(scope.row)"
                />
                <el-button
                  slot="reference"
                  type="danger"
                  @click="deleteAuthorityItem(scope.row)"
                  icon="el-icon-delete"
                />
              </template>
            </el-table-column>
          </tree-table>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" :is-add="isAdd" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import Form from './components/form'
import eForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { eForm }
};
</script>

<style>
</style>
