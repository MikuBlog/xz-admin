<template>
  <div class="menu-manage">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal"
                placeholder="搜索菜单名称"
                class="search-input margin-box"
                @keyup.native="searchEnter"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddMenu"
                title="添加菜单"
                circle
              ></el-button>
            </el-row>
          </div>
          <el-table
            :data="menuList"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            v-if="isShow"
            :default-expand-all="expand"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            highlight-current-row
            stripe
          >
            <el-table-column prop="name" label="名称" width="250px" :render-header="renderHeader"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
              <template slot-scope="scope">
                <svg-icon :icon-class="scope.row.icon" />
              </template>
            </el-table-column>
            <el-table-column prop="sort" align="center" label="排序">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.sort }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="path" label="链接地址" />
            <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
            <el-table-column prop="iframe" label="内部菜单" align="center" width="80px">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="!scope.row.iframe ? 'success' : 'info'"
                >{{!scope.row.iframe ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="enabled" label="是否显示" align="center" width="80px">
              <template slot-scope="scope">
                <el-tag
                  effect="dark"
                  :type="scope.row.enabled ? 'success' : 'info'"
                >{{scope.row.enabled ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editMenuItem(scope.row)" />
                <el-button
                  slot="reference"
                  type="danger"
                  @click="deleteMenuItem(scope.row)"
                  icon="el-icon-delete"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <operation-box 
    :options="buttonOptions"
    @showAddMenu="showAddMenu"/>
    <eForm ref="form" :is-add="isAdd" />
  </div>
</template>

<script>
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
import eForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { eForm }
};
</script>

