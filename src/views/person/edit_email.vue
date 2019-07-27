<template>
    <el-dialog :visible.sync="dialog" title="修改邮箱" append-to-body width="500px">
    <el-form ref="userForm" :model="userForm" :rules="rules" size="small" label-width="80px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" style="width: 360px;"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" style="width: 360px;"/>
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
            userForm: { email: "", password: "" },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 21, message: '长度在 3 到 21 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        hideBox() {
            this.dialog = false
        },
        // 重置表单
        resetForm() {
            try {
                this.userForm = { email: "", password: "" }
                this.$refs.userForm.resetFields()
            }catch(e) {}
        },
        doSubmit() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.$http_json({
                        url: "/api/user/updateMail",
                        method: "post",
                        data: this.userForm
                    }).then(() => {
                        this.hideBox()
                        this.$successMsg("修改成功")
                        this.$emit("updateUserInfo")
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style>

</style>
