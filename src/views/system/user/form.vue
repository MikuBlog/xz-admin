<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="570px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.enabled" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="部门">
        <treeselect v-model="deptId" :options="depts" :style="style" placeholder="选择部门" @select="selectFun" />
      </el-form-item>
      <el-form-item label="岗位">
        <el-select v-model="jobId" :style="style" placeholder="请先选择部门">
          <el-option
            v-for="(item, index) in jobs"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="角色">
        <el-select v-model="roleIds" style="width: 450px;" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in roles"
            :disabled="level !== 1 && item.level <= level"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
    // 验证电话号码
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialog: false, form: { username: '', email: '', enabled: 'false', roles: [], job: { id: '' }, dept: { id: '' }, phone: null },
      roleIds: [], roles: [], depts: [], deptId: null, jobId: null, jobs: [], style: 'width: 184px', level: 3,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        enabled: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
        this.form.dept.id = this.deptId
        this.form.job.id = this.jobId
        this.$refs['form'].validate((valid) => {
            if (valid) {
                if (this.deptId === null || this.deptId === undefined) {
                    this.$warnMsg("部门不能为空")
                    return
                }
                if (this.jobId === null) {
                    this.$warnMsg("岗位不能为空")
                    return
                }
                if (this.roleIds.length === 0) {
                    this.$warnMsg("角色不能不为空")
                    return
                }
                this.form.roles = []
                const _this = this
                this.roleIds.forEach(function(data, index) {
                    const role = { id: data }
                    _this.form.roles.push(role)
                })
                this.isAdd
                ? this.addUser()
                : this.editUser()
            }else {
                return false
            }
        })
    },
    addUser() {
      
    },
    editUser() {

    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.deptId = null
      this.jobId = null
      this.roleIds = []
      this.form = { username: '', email: '', enabled: 'false', roles: [], job: { id: '' }, dept: { id: '' }, phone: null }
    },
    getRoles() {
        this.$http_json({
            url: ""
        })
    //   getAll().then(res => {
    //     this.roles = res
    //   }).catch(err => {
    //     console.log(err.response.data.message)
    //   })
    },
    getJobs(id) {
    //   getAllJob(id).then(res => {
    //     this.jobs = res.content
    //   }).catch(err => {
    //     console.log(err.response.data.message)
    //   })
    },
    getDepts() {
    //   getDepts({ enabled: true }).then(res => {
    //     this.depts = res.content
    //   })
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    selectFun(node, instanceId) {
    //   this.getJobs(node.id)
    },
    getRoleLevel() {
        this.$http_json({
            url: "/api/role/level",
            method: "get"
        }).then(result => {
            console.log()
        })
    //   getLevel().then(res => {
    //     this.level = res.level
    //   }).catch(err => {
    //     console.log(err.response.data.message)
    //   })
    }
  }
}
</script>

<style scoped>
</style>