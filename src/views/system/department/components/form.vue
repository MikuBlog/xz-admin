<template>
  <el-dialog
    append-to-body
    v-dialogDrag
    :visible.sync="dialog"
    :title="isAdd ? '新增部门' : '编辑部门'"
    width="500px"
  >
    <el-form
      ref="departmentForm"
      :model="departmentForm"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item status-icon label="名称" prop="name">
        <el-input v-model="departmentForm.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item v-if="departmentForm.pid !== 0" label="状态" prop="enabled">
        <el-radio
          v-for="item in dicts"
          :key="item.id"
          v-model="departmentForm.enabled"
          :label="item.value"
        >{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item v-if="departmentForm.parentId !== 0" style="margin-bottom: 0px;" label="上级部门">
        <treeselect
          v-model="departmentForm.parentId"
          :options="depts"
          style="width: 370px;"
          placeholder="选择上级类目"
        />
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
      dialog: false,
      depts: [],
      departmentId: "",
      departmentForm: {
        id: "",
        name: "",
        parentId: 1,
        enabled: "true"
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
	beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter)
	},
  created() {
    // 请求部门列表
    this.getDepartmentList();
		document.addEventListener('keypress', this.submitEnter)
  },
  methods: {
		submitEnter(e) {
			e.keyCode === 13 && this.dialog === true && this.doSubmit()
		},
    // 隐藏弹窗
    hideBox() {
      this.dialog = false;
    },
    // 提交数据
    doSubmit() {
      this.$refs.departmentForm.validate(valid => {
        if (valid) {
          if (this.departmentForm.parentId == undefined) {
            this.$warnMsg("请选择上级部门");
            return;
          }
          this.isAdd ? this.addDepartment() : this.editDepartment();
        } else {
          return false;
        }
      });
    },
    // 添加部门
    addDepartment() {
      delete this.departmentForm.id;
      this.$http_json({
        url: "/api/dept/add",
        method: "post",
        data: this.departmentForm
      }).then(result => {
        this.$successMsg("添加成功");
        this.hideBox();
        this.getDepartmentList();
        this.$parent.getDepartmentList();
      });
    },
    // 编辑部门
    editDepartment() {
      this.departmentForm.id = this.departmentId;
      this.$http_json({
        url: "/api/dept/edit",
        method: "post",
        data: this.departmentForm
      }).then(result => {
        this.$successMsg("编辑成功");
        this.hideBox();
        this.getDepartmentList();
        this.$parent.getDepartmentList();
      });
    },
    resetForm() {
      try {
        this.departmentForm = {
          id: "",
          name: "",
          parentId: 1,
          enabled: "true"
        };
        this.$refs.departmentForm.resetFields();
      } catch (e) {}
    },
    // 获取部门列表
    getDepartmentList() {
      this.$http_json({
        url: "/api/dept/get?enabled=true",
        method: "get"
      }).then(result => {
        this.depts = result.data.content;
      });
    }
  }
};
</script>

<style scoped>
</style>