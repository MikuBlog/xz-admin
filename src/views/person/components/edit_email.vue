<template>
  <div>
    <el-form
      status-icon
      ref="userForm"
      :model="userForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" style="width: 360px;" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password" style="width: 360px;" />
      </el-form-item>
			<el-form-item>
			  <el-button @click="resetForm" size="small">重置</el-button>
			  <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { encrypt } from '@/utils/encrypt'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userForm: { email: "", password: "" },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "change" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, max: 21, message: "长度在 3 到 21 个字符", trigger: "change" }
        ]
      }
    };
  },
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	watch: {
		'user.email': function() {
			this.userForm.email = this.user.email
		}
	},
  methods: {
    // 重置表单
    resetForm() {
      try {
        this.userForm = { email: "", password: "" };
        this.$refs.userForm.resetFields();
      } catch (e) {}
    },
    doSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/user/updateMail",
            method: "post",
            data: {
							email: this.userForm.email,
							password: encrypt(this.userForm.password)
						}
          }).then(() => {
            this.$successMsg("修改成功");
            this.$emit("updateUserInfo");
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
