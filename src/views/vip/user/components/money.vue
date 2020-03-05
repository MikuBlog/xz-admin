<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="`修改${userName}的余额`"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="余额数" prop="money">
        <el-input-number controls-position="right" type="number" v-model="form.money" style="width: 350px;"></el-input-number>
      </el-form-item>
      <el-form-item label="方向" prop="pm">
        <el-radio-group v-model="form.pm">
          <el-radio :label="1">增加</el-radio>
          <el-radio :label="0">减少</el-radio>
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
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    const 
      numberValidate = (rule, value, callback) => {
        value < 0 ? callback(new Error("不得小于0")) : callback();
      },
      numberValidate_2 = (rule, value, callback) => {
        value < 0 || value > 999 ? callback(new Error("排序范围在0~999")) : callback();
      }
    return {
      dialog: false,
      isAdd: true,
      userName: "",
      form: {
        uid: "",
        money: 0,
        pm: 1
      },
      rules: {
        money: [{ required: true, validator: numberValidate, trigger: "blur" }],
        pm: [
          { required: true, message: "请选择方向", trigger: "blur" }
        ]
      }
    };
  },
  beforeDestroy() {
    document.removeEventListener("keypress", this.submitEnter);
  },
  created() {
    this.getLevelList()
    document.addEventListener("keypress", this.submitEnter);
  },
  methods: {
    submitEnter(e) {
      e.keyCode === 13 && this.dialog === true && this.doSubmit();
    },
    hideBox() {
      this.resetForm();
    },
    doSubmit() {
      this.doEdit();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/memberTask/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getUserList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
          });
        } else {
          return false;
        }
      });
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/userInfo/editMoney",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("修改余额成功");
            this.hideBox();
            this.$parent.getUserList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
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
        uid: "",
        money: 0,
        pm: 1
      };
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