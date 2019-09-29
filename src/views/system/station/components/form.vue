<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增岗位' : '编辑岗位'" width="500px">
    <el-form ref="stationForm" :model="stationForm" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="stationForm.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model.number="stationForm.sort" :min="0" :max="999" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="stationForm.pid !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in dicts" :key="item.id" v-model="stationForm.enabled" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="所属部门">
        <treeselect v-model="stationForm.dept.id" :options="depts" style="width: 370px" placeholder="选择部门"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small" class="margin-box">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small" class="margin-box">确认</el-button>
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
    return {
        dialog: false, depts: [],
        stationId: "",
        stationForm: {
            name: '',
            sort: 0,
            enabled: 'true',
            createTime: '',
            dept: { id: 1 }
        },
        rules: {
            name: [
                { required: true, message: '请输入名称', trigger: 'blur' }
            ],
            sort: [
                { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
            ]
        }
    }
  },
  created() {
      // 获取部门
      this.getDepartmentList()
  },
  methods: {
    // 隐藏窗口
    hideBox() {
        this.dialog = false
    },
    // 提价信息
    doSubmit() {
      this.$refs['stationForm'].validate((valid) => {
        if (valid) {
          if(this.stationForm.dept.id == undefined) {
            this.$warnMsg("请选择所属部门")
            return
          }
          this.isAdd
          ? this.addStation()
          : this.editStation()
        }else {
            return false
        }
      })
    },
    // 添加岗位
    addStation() {
      delete this.stationForm.id
      this.$http_json({
        url: "/api/job/add",
        method: "post",
        data: this.stationForm
      }).then(result => {
        this.$successMsg('添加成功')
        this.hideBox()
        this.getDepartmentList()
        this.$parent.getStationList()
      }) 
    },
    // 编辑岗位
    editStation() {
      this.stationForm.id = this.stationId
      this.$http_json({
        url: "/api/job/edit",
        method: "post",
        data: this.stationForm
      }).then(result => {
        this.$successMsg('编辑成功')
        this.hideBox()
        this.getDepartmentList()
        this.$parent.getStationList()
      }) 
    },
    // 重置表单
    resetForm() {
      try {
        this.deptId = 1
        this.stationForm = {
            id: '',
            name: '',
            sort: 0,
            enabled: 'true',
            createTime: '',
            dept: { id: 1 }
        }
        this.$refs.stationForm.resetFields()
      }catch(e) {}
    },
    // 初始化部门列表
    initialDepartmentlist(list) {
      this.depts.splice(0)
      this.depts = list
    },
    // 获取部门列表
    getDepartmentList() {
        this.$http_json({
          url: "/api/dept/get?enabled=true",
          method: "get"
        }).then(result => {
          this.initialDepartmentlist(result.data.content)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>