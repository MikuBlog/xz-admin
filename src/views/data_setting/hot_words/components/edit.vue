<template>
  <el-dialog :visible.sync="dialog" title="新增热词" width="570px" append-to-body v-dialogDrag>
    <el-form status-icon ref="form" :model="form" :rules="rules" size="small" @submit.native.prevent="editHotWords">
      <el-form-item label="热词名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="editHotWords" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: {
        name: "",
        id: ""
      },
      roleIds: [],
      roles: [],
      depts: [],
      deptId: null,
      jobId: null,
      jobs: [],
      level: 3,
      rules: {
        name: [
          { required: true, message: "请输入热词", trigger: "blur" },
          {
            min: 2,
            max: 21,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
			this.resetForm()
    },
    // 编辑热词
    editHotWords() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/shop/hotWord/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getHotWordsList(this.$parent.nowPage, this.$parent.nowSize)
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.form = {
          name: ""
        };
        this.$refs.form.resetFields();
      } catch (e) {}
    }
  }
};
</script>