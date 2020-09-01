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
                @keyup.native.enter="search"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
              <el-button
                circle
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddAuthority()"
                title="添加权限"
              ></el-button>
							<el-button
							  type="warning"
							  icon="el-icon-download"
							  class="margin-box"
							  @click="downloadList"
							  title="导出权限列表"
							  circle
							></el-button>
            </el-row>
          </div>
          <el-table
            :data="authorityList"
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
            <el-table-column prop="alias" label="别名">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建日期" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.createdAt }}</span>
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
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" :is-add="isAdd" />
  </div>
</template>

<script>
import Initial from './js/initial'
import Operation from './js/operation'
import Property from './js/property'
import Form from './components/form'
import eForm from "./components/form";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { eForm }
};
</script>

<style>
</style>
