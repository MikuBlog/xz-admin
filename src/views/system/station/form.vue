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
        <treeselect v-model="deptId" :options="depts" style="width: 370px" placeholder="选择部门" />
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
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
        dialog: false, depts: [], deptId: null,
        stationForm: {
            id: '',
            name: '',
            sort: 0,
            enabled: 'true',
            createTime: '',
            dept: { id: '' }
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
    doSubmit() {
      this.stationForm.dept.id = this.deptId
      this.$refs['stationForm'].validate((valid) => {
        if (valid) {
          
        }else {
            return false
        }
      })
    },
    addStation() {
      
    },
    editStation() {
      
    },
    resetForm() {
      try {
        this.$refs.stationForm.resetFields()
      }catch(e) {}
    },
    getDepartmentList() {
        this.$http_json({
            url: "/api/dept/get?enabled=true",
            method: "get"
        }).then(result => {
            this.depts = result.data.content
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