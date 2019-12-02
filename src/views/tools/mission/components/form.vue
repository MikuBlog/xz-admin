<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增任务' : '编辑任务'" append-to-body width="600px">
      <el-form status-icon ref="missionForm" :model="missionForm" :rules="rules" size="small" label-width="100px">
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="missionForm.jobName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="Bean名称" prop="beanName">
          <el-input v-model="missionForm.beanName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="missionForm.methodName" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="参数内容">
          <el-input v-model="missionForm.params" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cronExpression">
          <el-input v-model="missionForm.cronExpression" style="width: 460px;"/>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-radio v-model="missionForm.paused" label="false">启用</el-radio>
          <el-radio v-model="missionForm.paused" label="true">暂停</el-radio>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="missionForm.remark" style="width: 460px;" rows="2" type="textarea"/>
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
      dialog: false,
      missionId: "",
      missionForm: {
        jobName: "", beanName: "", methodName: "", params: "", cronExpression: "", paused: "false", remark: ""
      },
      rules: {
        jobName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        beanName: [
          { required: true, message: '请输入Bean名称', trigger: 'blur' }
        ],
        methodName: [
          { required: true, message: '请输入方法名称', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' }
        ]
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
        this.missionForm = {
          jobName: "", beanName: "", methodName: "", params: "", cronExpression: "", paused: "false", remark: ""
        }
        this.$refs.missionForm.resetFields()
      }catch(e) {}
    },
    // 编辑定时任务
    editMission() {
      this.missionForm.id = this.missionId
      this.$http_json({
        url: "/api/quartz/edit",
        method: "post",
        data: this.missionForm
      }).then(result => {
        this.$successMsg('编辑成功')
        this.hideBox()
        this.$parent.getMissionList()
      })
    },
    // 新增定时任务
    addMission() {
      delete this.missionForm.id
      this.$http_json({
        url: "/api/quartz/add",
        method: "post",
        data: this.missionForm
      }).then(result => {
        this.$successMsg('添加成功')
        this.hideBox()
        this.$parent.getMissionList()
      })
    },
    doSubmit() {
      this.$refs['missionForm'].validate((valid) => {
        if (valid) {
          this.isAdd
          ? this.addMission()
          : this.editMission()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>