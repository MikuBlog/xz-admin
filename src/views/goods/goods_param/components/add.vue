<template>
  <el-dialog :visible.sync="dialog" title="新增商品参数" width="570px" append-to-body v-dialogDrag @close="hideBox">
    <el-form status-icon ref="form" :model="form" :rules="rules" size="small" @submit.native.prevent="addParam">
      <el-form-item label="商品参数名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品参数值" prop="value">
        <el-input v-model="form.value" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="addParam" size="small">确认</el-button>
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
        value: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品参数名", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ],
        value: [
          { required: true, message: "请输入商品参数值", trigger: "blur" }
        ]
      }
    };
  },
  beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter)
	},
  created() {
		document.addEventListener('keypress', this.submitEnter)
  },
  methods: {
    submitEnter(e) {
			e.keyCode === 13 && this.dialog === true && this.addParam()
		},
    // 隐藏窗口
    hideBox() {
      this.dialog = false;
			this.resetForm()
    },
    addParam() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/productAttr/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getParamList(this.$parent.nowPage, this.$parent.nowSize)
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
          name: "",
          value: ""
        };
        this.$refs.form.resetFields();
      } catch (e) {}
    }
  }
};
</script>