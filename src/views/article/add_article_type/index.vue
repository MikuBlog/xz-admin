<template>
  <el-dialog
    :visible.sync="dialog"
    title="新增资讯分类"
    width="570px"
    append-to-body
    v-dialogDrag
  >
    <el-form
      status-icon
      ref="form"
      :inline="true"
      :model="form"
      :rules="rules"
      size="small"
      label-width="66px"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" />
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
  data() {
    return {
      dialog: false,
      form: {
        name: "",
      },
      roleIds: [],
      roles: [],
      depts: [],
      deptId: null,
      jobId: null,
      jobs: [],
      style: "width: 184px",
      level: 3,
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 21, message: "长度在 1 到 10 个字符", trigger: "change" }
        ]
      }
    };
  },
  created() {
    const explorer = navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
      this.style = "width: 184px";
    } else {
      this.style = "width: 172px";
    }
  },
  methods: {
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
    },
    // 提交数据
    doSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.roles = [];
          const _this = this;
          this.roleIds.forEach(function(data, index) {
            const role = { id: data };
            _this.form.roles.push(role);
          });
          this.isAdd ? this.addUser() : this.editUser();
        } else {
          return false;
        }
      });
    },
    // 添加用户
    addUser() {
      this.$http_json({
        url: "/api/user/add",
        method: "post",
        data: this.form
      }).then(result => {
        this.$successMsg("添加成功");
        this.hideBox();
        this.$parent.getArticleTypeList();
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.form = {
          name: ""
        };
        this.$refs.form.resetFields();
      } catch (e) {}
    },
  }
};
</script>