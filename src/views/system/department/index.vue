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
import eForm from "./components/form";
export default {
  components: { eForm },
  data() {
    return {
      expand: true,
      delLoading: false,
      searchVal: "",
      selectType: "",
      isAdd: true,
      dicts: [],
      departmentList: [],
      options: [
        {
          value: "true",
          label: "正常"
        },
        {
          value: "false",
          label: "禁用"
        }
      ],
      columns: [
        {
          text: "名称",
          value: "name"
        }
      ]
    };
  },
  created() {
    // 初始化获取部门列表
    this.getDepartmentList();
    // 获取岗位字典
    this.getDictsList("dept_status");
  },
  methods: {
    // 是否展开全部
    isExpandAll(e) {
      this.expand = !this.expand;
      this.expand
        ? (e.target.className = "el-icon-remove-outline")
        : (e.target.className = "el-icon-circle-plus-outline");
      this.getDepartmentList();
    },
    // 初始化表头
    renderHeader(h, { column }) {
      return h("div", [
        h("i", {
          class: "el-icon-remove-outline",
          style: {
            color: "#2196F3",
            paddingRight: "3px" 
          },
          on: {
            click: this.isExpandAll
          }
        }),
        h("span", column.label)
      ]);
    },
    // 删除部门
    deleteDepartment(item) {
      this.$showMsgBox({ msg: `是否删除${item.name}部门?` }).then(() => {
        this.$http_json({
          url: `/api/dept/del/${item.id}`,
          method: "post"
        }).then(() => {
          this.$successMsg("删除成功");
          this.getDepartmentList();
        });
      });
    },
    // 显示添加部门窗口
    showAddDepartment() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
      this.$refs.form.resetForm();
    },
    // 显示编辑部门窗口
    showEditDepartment() {
      this.isAdd = false;
      this.$refs.form.dialog = true;
    },
    // 编辑部门
    editDepartmentItem(item) {
      const departmentForm = this.$refs.form.departmentForm;
      this.$refs.form.departmentId = item.id;
      departmentForm.name = item.name;
      departmentForm.enabled = item.enabled.toString();
      departmentForm.parentId = item.parentId;
      this.showEditDepartment();
    },
    // 点击搜索
    search(val) {
      this.getDepartmentList();
    },
    // 回车搜索
    searchEnter(e) {
      e.keyCode === 13 && this.getDepartmentList();
    },
    // 初始化部门列表
    initialDepartmentList(list) {
      this.departmentList.splice(0);
      list.forEach(value => {
        this.departmentList.push(value);
      });
    },
    // 获取部门列表
    getDepartmentList() {
      this.$http_json({
        url: `/api/dept/get?sort=createTime,desc${
          this.searchVal ? `&name=${this.searchVal}` : ""
        }${this.selectType ? `&enabled=${this.selectType}` : ""}`,
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

<style>
</style>
