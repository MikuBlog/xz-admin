<template>
  <div class="role-manage">
    <el-row :gutter="20">
      <el-col :sm="24" :md="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="header">角色列表</span>
            <el-radio-group v-model="selectType" style="float: right" size="mini">
              <el-radio-button label="菜单分配"></el-radio-button>
              <el-radio-button label="权限分配"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal"
                placeholder="搜索角色名称"
                class="search-input margin-box"
                @keyup.native.enter="search"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddRole"
                title="添加角色"
                circle
              ></el-button>
							<el-button
							  type="warning"
							  icon="el-icon-download"
							  class="margin-box"
							  @click="downloadList"
							  title="导出列表"
							  circle
							></el-button>
            </el-row>
          </div>
          <el-table
            :data="roleList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%;"
            highlight-current-row
            stripe
            border
            @row-click="getRoleItem"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="角色描述" class="expand-line">
                    <span>{{ props.row.remark }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数据权限" show-overflow-tooltip>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.dataScope }}</div>
              </template>
            </el-table-column>
						<el-table-column label="权限标识" show-overflow-tooltip>
						  <template slot-scope="scope">
						    <div slot="reference" class="name-wrapper">{{ scope.row.authority || "无" }}</div>
						  </template>
						</el-table-column>
            <el-table-column label="角色级别" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.level }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createdAt }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editRoleItem(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteRole( scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getRoleList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
      <el-col :sm="24" :md="8">
        <el-card class="box-card card-gutter-sm" v-show="selectType == '菜单分配'">
          <div slot="header" class="clearfix">
            <span class="header">{{roleName}}菜单分配</span>
            <el-button
              type="primary"
              style="float: right; padding: 5px 10px"
              :disabled="!showButton"
              @click="saveMenu"
              size="mini"
            >
              <i class="el-icon-check el-icon--left"></i>保存
            </el-button>
          </div>
          <div class="tree-box">
            <el-tree
              ref="menu"
              :data="menus"
              :default-checked-keys="menuIds"
              :props="defaultProps"
              accordion
              show-checkbox
              node-key="id"
            />
          </div>
        </el-card>
        <el-card class="box-card card-gutter-sm" v-show="selectType == '权限分配'">
          <div slot="header" class="clearfix">
            <span class="header">{{roleName}}权限分配</span>
            <el-button
              type="primary"
              style="float: right; padding: 5px 10px"
              :disabled="!showButton"
              @click="savePermission"
            >
              <i class="el-icon-check el-icon--left"></i>保存
            </el-button>
          </div>
          <div class="tree-box">
            <el-tree
              ref="permission"
              :data="permissions"
              :default-checked-keys="permissionIds"
              :props="defaultProps"
              show-checkbox
              accordion
              node-key="id"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <eForm ref="form" :is-add="isAdd" />
  </div>
</template>

<script>
import Initial from "./js/initial";
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from "./components/form";
export default {
  mixins: [Initial, Operation, Property],
  components: { eForm }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  font-size: 1rem;
}
</style>
