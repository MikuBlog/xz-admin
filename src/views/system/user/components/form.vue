<template>
  <el-dialog
    :visible.sync="dialog"
    :title="isAdd ? '新增用户' : '编辑用户'"
    width="570px"
    append-to-body
    v-dialogDrag
    @close="hideBox"
  >
    <el-form
      status-icon
      ref="userForm"
      :inline="true"
      :model="userForm"
      :rules="rules"
      size="small"
      label-width="66px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
			<el-form-item label="昵称" prop="nickname">
			  <el-input v-model="userForm.nickname" />
			</el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="userForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" />
      </el-form-item>
      <el-form-item label="部门" prop="dept.id">
        <treeselect
          v-model="deptId"
          :options="depts"
          :style="style"
          placeholder="选择部门"
          @select="selectFun"
          @input="jobSelect"
        />
      </el-form-item>
      <el-form-item label="岗位" prop="job.id">
        <el-select v-model="jobId" class="select-station" :style="style" placeholder="请先选择部门">
          <el-option
            v-for="(item, index) in jobs"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="角色" prop="roles">
        <el-select v-model="roleIds" style="width: 450px;" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in roles"
            :disabled="level !== 1 && item.level <= level"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
			<el-form-item label="状态" prop="enabled" class="status">
			  <el-radio
			    v-for="item in dicts"
			    :key="item.id"
			    v-model="userForm.enabled"
			    :label="item.value"
			  >{{ item.label }}</el-radio>
			</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validateBothPhMob, validateEmail } from "@/utils/form_validate";
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      userId: "",
      level: "",
      userForm: {
        username: "",
				nickname: "",
        email: "",
        enabled: "false",
        roles: [],
        job: { id: "" },
        dept: { id: "" },
        phone: null
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
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 21, message: "长度在 2 到 21 个字符", trigger: "blur" }
        ],
				nickname: [
				  { required: true, message: "请输入昵称", trigger: "blur" }
				],
        email: [{ required: false, trigger: "change", validator: validateEmail }],
        phone: [{ required: true, trigger: "change", validator: validateBothPhMob }],
        enabled: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        'dept.id': [
				  { required: true, message: "请选择部门", trigger: "blur" }
				],
        'job.id': [
				  { required: true, message: "请选择岗位", trigger: "blur" }
        ],
      }
    };
  },
	beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter)
	},
  created() {
    const explorer = navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
      this.style = "width: 184px";
    } else {
      this.style = "width: 172px";
    }
		document.addEventListener('keypress', this.submitEnter)
  },
  methods: {
		submitEnter(e) {
			e.keyCode === 13 && this.dialog === true && this.doSubmit()
		},
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
      this.resetForm()
    },
    // 提交数据
    doSubmit() {
      this.userForm.dept.id = this.deptId;
      this.userForm.job.id = this.jobId;
      this.$refs.userForm.validate(valid => {
        if (valid) {
          if (this.roleIds.length === 0) {
            this.$warnMsg("角色不能不为空");
            return;
          }
          this.userForm.roles = [];
          const _this = this;
          this.roleIds.forEach(function(data, index) {
            const role = { id: data };
            _this.userForm.roles.push(role);
          });
          this.isAdd ? this.addUser() : this.editUser();
        } else {
          return false;
        }
      });
    },
    // 添加用户
    addUser() {
      delete this.userForm.id;
      this.$http_json({
        url: "/api/user/add",
        method: "post",
        data: this.userForm
      }).then(result => {
        this.$successMsg("添加成功");
        this.hideBox();
        this.$parent.getUserList(this.$parent.nowPage, this.$parent.nowSize);
      });
    },
    // 编辑用户
    editUser() {
      this.userForm.id = this.userId;
      this.$http_json({
        url: "/api/user/edit",
        method: "post",
        data: this.userForm
      }).then(result => {
        this.$successMsg("编辑成功");
        this.hideBox();
        this.$parent.getUserList(this.$parent.nowPage, this.$parent.nowSize);
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.deptId = null;
        this.jobId = null;
        this.roleIds = [];
        this.userForm = {
          username: "",
					nickname: "",
          email: "",
          enabled: "false",
          roles: [],
          job: { id: "" },
          dept: { id: "" },
          phone: null
        };
        this.$refs.userForm.resetFields();
      } catch (e) {}
    },
    // 获取角色
    getRoles() {
      this.$http_json({
        url: "/api/role/all",
        method: "get"
      }).then(result => {
        this.roles = result.data;
      });
    },
    // 清空岗位
    jobSelect() {
      this.jobId = null;
    },
    // 选择工作
    selectFun(node, instanceId) {
      this.getJobs(node.id);
    },
    // 初始化工作岗位
    initialJobs(list, id) {
      this.jobs.splice(0);
      list.forEach(value => {
        this.jobs.push(value);
      });
      this.jobId = id;
    },
    // 获取工作岗位
    getJobs(id, jobId) {
      this.$http_json({
        url: `/api/job/page?page=0&size=9999&deptId=${id}`,
        method: "get"
      }).then(result => {
        this.initialJobs(result.data.content, jobId);
      });
    },
    // 获取部门列表
    getDepts() {
      this.$http_json({
        url: "/api/dept/get",
        method: "get"
      }).then(result => {
        this.depts = result.data.content;
      });
    },
    // 获取角色权值
    getRoleLevel() {
      this.$http_json({
        url: "/api/role/level",
        method: "get"
      }).then(result => {
        this.level = result.data.content;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-treeselect,
.select-station {
  width: 188px !important;
}
.status {
	display: block;
	margin-top: 1rem;
}
</style>