<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增会员信息' : '编辑会员信息'"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="用户昵称" prop="nickname">
        <el-input :disabled="true" type="text" v-model="form.nickname" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input type="text" v-model="form.realName" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="用户备注" prop="mark">
        <el-input type="text" v-model="form.mark" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="number" v-model="form.phone" style="width: 350px;"></el-input>
      </el-form-item>
      <el-form-item label="用户积分" prop="integral">
        <el-input-number controls-position="right" type="number" v-model="form.integral" style="width: 350px;"></el-input-number>
      </el-form-item>
      <el-form-item label="推广员" prop="bePromoter">
        <el-radio-group v-model="form.bePromoter">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商户管理" prop="beBusiness">
        <el-radio-group v-model="form.beBusiness">
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
import convertHttp from "@/utils/convertHttp";
import { validateNumber, validateBothPhMob } from '@/utils/form_validate'
export default {
  data() {
    return {
      dialog: false,
      isAdd: true,
      form: {
        uid: "",
        nickname: "",
        realName: "",
        mark: "",
        phone: 1,
        integral: 0,
        bePromoter: 0,
        beBusiness: 0,
      },
      rules: {
        nickname: [{ required: false, message: "请输入用户昵称", trigger: "blur" }],
        realName: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        mark: [{ required: true, message: "请输入用户备注", trigger: "blur" }],
        phone: [{ required: true, validator: validateBothPhMob, trigger: "change" }],
        integral: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        bePromoter: [
          { required: true, message: "请选择是否为推广员", trigger: "blur" }
        ],
        beBusiness: [{ required: true, message: "请选择是否为商务管理人员", trigger: "blur" }]
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
    initial(data) {
      Object
				.keys(data)
				.forEach(val => {
          if(val === 'createTime' || val === 'editTime' || val === 'deletion' || val === 'editor') {
            return
          }
					this.form[val] = data[val]
        })
    },
    getDetail() {
      this.$http_json({
        url: `/api/userInfo/get/${this.form.uid}`,
        method: "get"
      }).then(result => {
        this.initial(result.data);
      });
    },
    doSubmit() {
      this.doEdit()
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
            url: "/api/userInfo/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
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
        nickname: "",
        realName: "",
        mark: "",
        phone: 1,
        integral: 0,
        bePromoter: 0,
        beBusiness: 0
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
