<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    title="修改状态"
    width="500px"
    @close="hideBox"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="状态" prop="status">
			  <el-radio-group v-model="form.status">
			    <el-radio :label="1">开启</el-radio>
			    <el-radio :label="0">关闭</el-radio>
			  </el-radio-group>
			</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import convertHttp from '@/utils/convertHttp'
export default {
  data() {
    return {
      dialog: false,
      form: {
        id: "",
        status: 1
      },
      rules: {
        status: [{ required: true, message: "请选择是否开启", trigger: "blur" }],
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
			e.keyCode === 13 && this.dialog === true && this.doSubmit()
    },
    hideBox() {
      this.resetForm();
    },
    doSubmit() {
      this.doEdit()
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/couponIssue/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("修改成功");
            this.hideBox();
            this.$parent.getCouponPublishList(this.$parent.nowPage, this.$parent.nowSize);
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        status: 1,
      };
    }
  }
};
</script>