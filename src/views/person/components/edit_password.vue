<template>
  <el-dialog :visible.sync="dialog" title="修改密码" append-to-body v-dialogDrag width="500px">
    <el-form
      status-icon
      ref="userForm"
      :model="userForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input v-model="userForm.oldPass" style="width: 360px;" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="userForm.newPass" type="password" style="width: 360px;" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="userForm.checkPass" type="password" style="width: 360px;" />
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
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialog: false,
      userForm: { oldPass: "", newPass: "" },
      rules: {
        oldPass: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 3, max: 21, message: "长度在 3 到 21 个字符", trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 21, message: "长度在 3 到 21 个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    hideBox() {
      this.dialog = false;
    },
    // 重置表单
    resetForm() {
      try {
        this.userForm = { oldPass: "", newPass: "", checkPass: "" };
        this.$refs.userForm.resetFields();
      } catch (e) {}
    },
    doSubmit() {
      delete this.userForm.checkPass;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/user/updatePassword",
            method: "post",
            data: this.userForm
          }).then(() => {
            this.hideBox();
            this.$successMsg("修改成功，请重新登录");
            this.$setMemoryPmt("token", "");
            this.$router.push({ path: "/login" });
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
