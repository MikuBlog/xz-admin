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
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userForm.nickname" style="width: 360px;" />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="userForm.phone" style="width: 360px;" />
      </el-form-item>
			<el-form-item label="性别" prop="enabled">
			  <el-radio v-model="userForm.sex" label="1">男</el-radio>
			  <el-radio v-model="userForm.sex" label="2">女</el-radio>
			</el-form-item>
			<el-form-item>
			  <el-button @click="resetForm" size="small">重置</el-button>
			  <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isMobile, isEmail } from "@/utils/validate";
import { mapState } from 'vuex'
export default {
  data() {
		// 验证电话号码
		const validPhone = (rule, value, callback) => {
		  if (!value) {
		    callback(new Error("请输入手机号码"));
		  } else if (!isMobile(value)) {
		    callback(new Error("请输入正确的11位手机号码"));
		  } else {
		    callback();
		  }
		};
    return {
      userForm: { nickname: "", phone: "", sex: "1" },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
        ],
        phone: [{ required: true, trigger: "change", validator: validPhone }]
      }
    };
  },
	computed: {
		...mapState({
			user: state => state.user
		})
	},
	watch: {
		'user.nickname': {
			handler() {
				this.userForm.nickname = this.user.nickname
			},
			immediate: true
		},
		'user.phone': {
			handler() {
				this.userForm.phone = this.user.phone
			},
			immediate: true
		},
		'user.sex': {
			handler() {
				this.userForm.sex = `${this.user.sex === 0 ? '1' : this.user.sex}`
			},
			immediate: true
		}
	},
  methods: {
    // 重置表单
    resetForm() {
      try {
        this.userForm = { nickname: "", phone: "", sex: "0" };
        this.$refs.userForm.resetFields();
      } catch (e) {}
    },
    doSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/user/center",
            method: "post",
            data: this.userForm
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
