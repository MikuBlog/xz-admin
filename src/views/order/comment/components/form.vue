<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    title="回复评论"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="回复内容" prop="merchantReplyContent">
			  <el-input type="textarea" :rows="4" v-model="form.merchantReplyContent" style="width: 350px;" />
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
    const 
      numberValidate = (rule, value, callback) => {
        value < 0 
          ? callback(new Error("不得小于0"))
          : callback();
      },
      numberValidate_2 = (rule, value, callback) => {
        value < 0 || value > 100
          ? callback(new Error("范围在0~100"))
          : callback();
      }
    return {
      dialog: false,
      form: {
        id: "",
        merchantReplyContent: "",
        merchantReplyTime: "",
        onReply: 1
      },
      rules: {
        merchantReplyContent: [{ required: true, message: "请输入回复内容", trigger: "blur" }]
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
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/productReply/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getCommentList(this.$parent.nowPage, this.$parent.nowSize);
          });
        } else {
          return false;
        }
      });
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.merchantReplyTime = this.$formatDate(new Date, true)
          this.$http_json({
            url: "/api/productReply/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("回复成功");
            this.hideBox();
            this.$parent.getCommentList(this.$parent.nowPage, this.$parent.nowSize);
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
        merchantReplyContent: "",
        merchantReplyTime: "",
        onReply: 1
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>