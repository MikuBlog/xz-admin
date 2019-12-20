<template>
  <div class="user-manage">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="8" :md="6">
        <el-card class="box-card">
          <div class="search">
            <el-row>
              <el-input
                v-model="searchVal_1"
                placeholder="搜索部门名称"
                class="search-input margin-box"
                @keyup.native="searchEnter_1"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search_1" circle></el-button>
            </el-row>
          </div>
          <div class="tree-box">
            <el-tree
              :data="departmentList"
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="16" :md="18">
        <el-card class="box-card card-gutter-xs">
          <div class="search">
            <el-row :gutter="10">
              <el-input
                v-model="searchVal_2"
                placeholder="请选择类型进行搜索"
                class="search-input margin-box"
                @keyup.native="searchEnter_2"
              />
              <el-select v-model="selectType" clearable placeholder="类型" class="select-input">
                <el-option
                  v-for="item in options_1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="selectStatus"
                clearable
                placeholder="状态"
                @change="getStatus"
                class="select-input margin-box"
              >
                <el-option
                  v-for="item in options_2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button icon="el-icon-search" class="margin-box" @click="search_2" circle></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddUser"
                title="添加新用户"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                class="margin-box"
                @click="deleteAll"
                :disabled="!selectList.length"
                title="批量删除"
                circle
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-download"
                class="margin-box"
                @click="downloadUserList"
                title="导出用户列表"
                circle
              ></el-button>
            </el-row>
          </div>
          <el-table
            ref="userTable"
            :data="userList"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
          >
            <el-table-column type="selection" width="55" reserve-selection />
            <el-table-column label="用户名" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话" width="150">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.phone }}</div>
              </template>
            </el-table-column>
            <el-table-column label="邮箱" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.email }}</div>
              </template>
            </el-table-column>
            <el-table-column label="部门" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.dept.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="岗位" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{scope.row.job.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    :type="scope.row.enabled ? '' : 'info'"
                  >{{ scope.row.enabled ? "激活" : "锁定"}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" @click="editUserItem(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteUserItem(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getUserList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <operation-box
      :options="buttonOptions"
      @showAddUser="showAddUser"
      @deleteAll="deleteAll"
      @downloadUserList="downloadUserList"
    />
    <eForm ref="form" :is-add="isAdd" :dicts="dicts" />
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

<style lang="scss" scoped>
</style>
