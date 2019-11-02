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
                type="warning"
                icon="el-icon-download"
                class="margin-box"
                @click="downloadUserList"
                title="导出用户列表"
                circle
              ></el-button>
            </el-row>
          </div>
          <el-table :data="userList" :highlight-current-row="true" style="width: 100%;">
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
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editUserItem(scope.row)"
                  size="small"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteUserItem(scope.row)"
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
    </el-row>
    <eForm ref="form" :is-add="isAdd" :dicts="dicts" />
  </div>
</template>

<script>
import eForm from "./components/form";
export default {
  components: { eForm },
  data() {
    return {
      searchVal_1: "",
      searchVal_2: "",
      selectType: "",
      selectStatus: "",
      isAdd: true,
      dicts: [],
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      // 部门编号
      deptId: 1,
      departmentList: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      options_1: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "email",
          label: "邮箱"
        }
      ],
      options_2: [
        {
          value: "true",
          label: "激活"
        },
        {
          value: "false",
          label: "锁定"
        }
      ],
      userList: []
    };
  },
  created() {
    // 初始化获取部门列表
    this.getDepartmentList();
    // 获取岗位字典
    this.getDictsList("user_status");
    // 获取用户列表
    this.getUserList();
  },
  methods: {
    // 导出用户列表
    downloadUserList() {
      this.$http_json({
        url: "/api/user/download",
        responseType: 'blob',
        method: "get"
      }).then(result => {
        this.$download(result.data, `用户列表-${this.$formDate(new Date(), true)}.xls`, true)
      }).catch(e => {
        console.log(e)
      })
    },
    // 删除用户
    deleteUserItem(item) {
      this.$showMsgBox({
        msg: `<p>是否删除${item.username}用户?</p>`,
        isHTML: true
      }).then(() => {
        this.$http_json({
          url: `/api/user/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getUserList();
        });
      });
    },
    // 显示添加用户窗口
    showAddUser() {
      const form = this.$refs.form;
      this.isAdd = true;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
      form.resetForm();
    },
    // 显示编辑用户窗口
    showEditUser() {
      const form = this.$refs.form;
      this.isAdd = false;
      form.dialog = true;
      form.getRoles();
      form.getDepts();
      form.getRoleLevel();
    },
    // 编辑用户项
    editUserItem(item) {
      const userItem = this.$refs.form.userForm,
        component = this.$refs.form;
      userItem.username = item.username;
      userItem.enabled = item.enabled.toString();
      userItem.phone = item.phone;
      userItem.email = item.email;
      component.userId = item.id;
      component.jobId = item.job.id;
      component.roleIds = item.roles.map(val => val.id);
      component.deptId = item.dept.id;
      component.getJobs(item.dept.id, item.job.id);
      this.showEditUser();
    },
    // 点击搜索
    search_1() {
      this.getDepartmentList();
    },
    // 回车搜索
    searchEnter_1(e) {
      e.keyCode === 13 && this.getDepartmentList();
    },
    // 点击搜索
    search_2() {
      this.nowPage = 1;
      this.selectType ? this.getUserList() : this.$warnMsg("请选择搜索类型");
    },
    // 回车搜索
    searchEnter_2(e) {
      this.nowPage = 1;
      e.keyCode === 13 &&
        (this.selectType
          ? this.getUserList()
          : this.$warnMsg("请选择搜索类型"));
    },
    // 搜索状态
    getStatus() {
      this.getUserList();
    },
    handleNodeClick(val) {
      this.deptId = val.id;
      this.getUserList();
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getUserList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getUserList();
    },
    // 初始化用户列表
    initialUserList(list) {
      this.userList.splice(0, this.userList.length);
      list.forEach(value => {
        this.userList.push(value);
      });
    },
    // 获取用户列表信息
    getUserList() {
      this.$http_normal({
        url: `/api/user/page?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc&deptId=${this.deptId}${
          this.selectType ? `&${this.selectType}=${this.searchVal_2}` : ""
        }${this.selectStatus ? `&enabled=${this.selectStatus}` : ""}`,
        method: "get"
      })
        .then(result => {
          const data = result.data;
          this.initialPage(data.totalElements);
          this.initialUserList(data.content);
        })
        .catch(e => {
          this.$setMemoryPmt("token", "");
          this.$warnMsg("修改了当前账户，请重新登录");
          this.$router.push({ path: "/login" });
        });
    },
    // 初始化部门列表
    initialDepartmentList(list) {
      this.departmentList.splice(0);
      list.forEach(value => {
        this.departmentList.push(value);
      });
    },
    // 获取部门信息
    getDepartmentList() {
      this.$http_json({
        url: `/api/dept/get${
          this.searchVal_1 ? `?name=${this.searchVal_1}` : ""
        }`,
        method: "get"
      }).then(result => {
        this.initialDepartmentList(result.data.content);
      });
    },
    // 获取岗位字典
    getDictsList(dictName) {
      this.$http_json({
        url: `/api/dictDetail/page?page=0&size=9999&sort=sort,asc&dictName=${dictName}`
      }).then(result => {
        this.dicts = result.data.content;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
