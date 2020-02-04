<template>
  <el-dialog :visible.sync="dialog" title="新增资讯分类" width="570px" append-to-body v-dialogDrag>
    <el-form status-icon ref="form" :model="form" :rules="rules" size="small">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="addArticleType" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: {
        name: ""
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
          { required: true, message: "请输入分类名称", trigger: "blur" },
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
    // 添加资讯分类
    addArticleType() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/shop/articleType/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getArticleTypeList(this.$parent.nowPage, this.$parent.nowSize)
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