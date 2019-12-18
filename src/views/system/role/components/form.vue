<template>
  <el-dialog
    :visible.sync="dialog"
    :title="isAdd ? '新增角色' : '编辑角色'"
    append-to-body
    v-dialogDrag
    width="500px"
  >
    <el-form
      status-icon
      ref="roleForm"
      :model="roleForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="角色级别" prop="sort">
        <el-input-number
          v-model.number="roleForm.level"
          :min="1"
          controls-position="right"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="数据范围">
        <el-select
          v-model="roleForm.dataScope"
          style="width: 370px"
          placeholder="请选择数据范围"
          @change="changeScope"
        >
          <el-option v-for="item in dateScopes" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="roleForm.dataScope === '自定义'" label="数据权限">
        <treeselect
          v-model="deptIds"
          :options="depts"
          multiple
          style="width: 370px"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="roleForm.remark" style="width: 370px;" rows="5" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      roleId: "",
      dateScopes: ["全部", "本级", "自定义"],
      dialog: false,
      depts: [],
      deptIds: [],
      roleForm: {
        name: "",
        depts: [],
        remark: "",
        dataScope: "本级",
        level: 3
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 隐藏弹窗
    hideBox() {
      this.dialog = false;
    },
    // 提交数据
    doSubmit() {
      if (this.roleForm.dataScope === "自定义" && this.deptIds.length === 0) {
        this.$warnMsg("自定义数据权限不能为空");
      } else {
        this.roleForm.depts = [];
        if (this.roleForm.dataScope === "自定义") {
          for (let i = 0; i < this.deptIds.length; i++) {
            this.roleForm.depts.push({
              id: this.deptIds[i]
            });
          }
        }
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            this.isAdd ? this.addRole() : this.editRole();
          } else {
            return false;
          }
        });
      }
    },
    // 添加角色
    addRole() {
      delete this.roleForm.id;
      this.$http_json({
        url: "/api/role/add",
        method: "post",
        data: this.roleForm
      }).then(() => {
        this.$successMsg("添加成功");
        this.hideBox();
        this.$parent.getRoleList();
      });
    },
    // 编辑角色
    editRole() {
      this.roleForm.id = this.roleId;
      this.$http_json({
        url: "/api/role/edit",
        method: "post",
        data: this.roleForm
      }).then(() => {
        this.$successMsg("编辑成功");
        this.hideBox();
        this.$parent.getRoleList();
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.roleForm = {
          name: "",
          depts: [],
          remark: "",
          dataScope: "本级",
          level: 3
        };
        this.$refs["form"].resetFields();
      } catch (e) {}
    },
    // 获取部门
    getDepts() {
      this.$http_json({
        url: "/api/dept/get?enabled=true",
        method: "get"
      }).then(result => {
        this.depts = result.data.content;
      });
    },
    changeScope() {
      if (this.roleForm.dataScope === "自定义") {
        this.getDepts();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-input-number .el-input__inner {
  text-align: left;
}
</style>