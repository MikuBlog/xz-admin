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
                @keyup.native="searchEnter"
              ></el-input>
              <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                class="margin-box"
                @click="showAddRole()"
                circle
              ></el-button>
            </el-row>
          </div>
          <el-table
            :data="roleList"
            style="width: 100%;"
            :highlight-current-row="true"
            @row-click="getRoleItem"
          >
            <el-table-column label="名称" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="数据权限" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.dataScope }}</div>
              </template>
            </el-table-column>
            <el-table-column label="角色级别" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.level }}</div>
              </template>
            </el-table-column>
            <el-table-column label="描述" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.remark }}</div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editRoleItem(scope.row)"
                  size="small"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRole( scope.row)"
                  size="small"
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
              size="mini"
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
    <eForm ref="form" :is-add="isAdd" @updateRoleList="getRoleList" />
  </div>
</template>

<script>
import eForm from "./form";
export default {
  components: { eForm },
  data() {
    return {
      roleId: "",
      searchVal: "",
      selectType: "菜单分配",
      title: "菜单分配",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      isAdd: true,
      showButton: false,
      // 角色名称
      roleName: "",
      ids: [],
      tree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      roleList: [],
      permissions: [],
      permissionIds: [],
      menus: [],
      menuIds: []
    };
  },
  created() {
    // 初始化角色列表
    this.getRoleList();
    // 初始化选项列表
    this.getMenuTree();
    this.getAuthorityTree();
  },
  methods: {
    // 删除角色
    deleteRole(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}角色?` }).then(() => {
        this.$http_json({
          url: `/api/role/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getDictionaryList();
        });
      });
    },
    // 添加角色弹窗
    showAddRole() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 编辑角色弹窗
    showEditRole() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 保存菜单
    saveMenu() {
      const role = { id: this.roleId, menus: [] };
      // 得到半选的父节点数据，保存起来
      this.$refs.menu.getHalfCheckedNodes().forEach(function(data, index) {
        const permission = { id: data.id };
        role.menus.push(permission);
      });
      // 得到已选中的 key 值
      this.$refs.menu.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data };
        role.menus.push(permission);
      });
      this.$http_json({
        url: "/api/role/updateMenu",
        method: "post",
        data: role
      }).then(() => {
        this.$successMsg("保存成功");
        this.updateRole();
      });
    },
    // 保存权限
    savePermission() {
      const role = { id: this.roleId, permissions: [] };
      this.$refs.permission.getCheckedKeys().forEach(function(data, index) {
        const permission = { id: data };
        role.permissions.push(permission);
      });
      this.$http_json({
        url: "/api/role/updatePermission",
        method: "post",
        data: role
      }).then(() => {
        this.$successMsg("保存成功");
        this.updateRole();
      });
    },
    // 编辑角色
    editRoleItem(item) {
      const roleItem = this.$refs.form.roleForm,
        component = this.$refs.form;
      this.$refs.form.roleId = item.id;
      roleItem.name = item.name;
      roleItem.remark = item.remark;
      roleItem.level = item.level;
      roleItem.dataScope = item.dataScope;
      component.deptIds = item.depts.map(val => val.id);
      component.changeScope();
      this.showEditRole();
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getRoleList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getRoleList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getRoleList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getRoleList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化角色列表
    initialRoleList(list) {
      this.roleList.splice(0);
      list.forEach(value => {
        this.roleList.push(value);
      });
    },
    // 初始化权限选中
    initialRoleCheck(item) {
      item.permissions.forEach(val => {
        this.permissionIds.push(val.id);
      });
    },
    // 初始化菜单选中
    initialMenuCheck(item) {
      item.menus.forEach((val, ind) => {
        let add = true;
        for (let i = 0; i < item.menus.length; i++) {
          if (val.id === item.menus[i].parentId) {
            add = false;
            break;
          }
        }
        if (add) {
          this.menuIds.push(val.id);
        }
      });
    },
    // 清空选项
    clearCheck() {
      this.menuIds = [];
      this.permissionIds = [];
      this.$refs.menu.setCheckedKeys([]);
      this.$refs.permission.setCheckedKeys([]);
    },
    // 更新单个用户的数据
    updateRole() {
      this.$http_json({
        url: `/api/role/get/${this.roleId}`,
        method: "get"
      }).then(result => {
        this.getRoleItem(result.data);
        this.getRoleList();
      });
    },
    // 点击表格项
    getRoleItem(item) {
      this.roleName = item.name;
      this.roleId = item.id;
      this.showButton = true;
      this.clearCheck();
      this.initialMenuCheck(item);
      this.initialRoleCheck(item);
    },
    // 获取菜单列表
    getMenuTree() {
      this.$http_json({
        url: "/api/menu/tree",
        method: "get"
      }).then(result => {
        this.menus = result.data;
      });
    },
    // 获取权限列表
    getAuthorityTree() {
      this.$http_json({
        url: "/api/permission/tree",
        method: "get"
      }).then(result => {
        this.permissions = result.data;
      });
    },
    // 获取权限日志信息
    getRoleList() {
      this.$http_normal({
        url: `/api/role/page?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialRoleList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  font-size: 1rem;
}
</style>
