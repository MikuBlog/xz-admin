<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增会员等级' : '编辑会员等级'"
    width="500px"
    @close="hideBox"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="等级名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="会员价格" prop="money">
			  <el-input v-model="form.money">
          <template slot="append">元</template>
			  </el-input>
			</el-form-item>
			<el-form-item label="有效天数" prop="validDate">
			  <el-input v-model="form.validDate">
          <template slot="append">天</template>
			  </el-input>
			</el-form-item>
			<el-form-item label="会员等级" prop="grade">
			  <el-input-number controls-position="right" v-model="form.grade" />
			</el-form-item>
      <el-form-item label="享受折扣" prop="discount">
			  <el-input controls-position="right" v-model="form.discount">
          <template slot="append">%</template>
			  </el-input>
			</el-form-item>
      <el-form-item label="允许购买" prop="onPay">
			  <el-radio-group v-model="form.onPay">
			    <el-radio :label="true">是</el-radio>
			    <el-radio :label="false">否</el-radio>
			  </el-radio-group>
			</el-form-item>
      <el-form-item label="是否永久" prop="onForever">
			  <el-radio-group v-model="form.onForever">
			    <el-radio :label="true">是</el-radio>
			    <el-radio :label="false">否</el-radio>
			  </el-radio-group>
			</el-form-item>
      <el-form-item label="是否显示" prop="onShow">
			  <el-radio-group v-model="form.onShow">
			    <el-radio :label="true">是</el-radio>
			    <el-radio :label="false">否</el-radio>
			  </el-radio-group>
			</el-form-item>
      <el-form-item label="会员背景" prop="image">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadImage_1"
          :show-file-list="false"
          action="string"
        >
          <img v-if="imageUrl_1" :src="imageUrl_1" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="会员图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadImage_2"
          :show-file-list="false"
          action="string"
        >
          <img v-if="imageUrl_2" :src="imageUrl_2" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="说明" prop="remark">
			  <el-input type="textarea" :rows="4" v-model="form.remark" style="width: 350px;" />
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
import { validateNumber } from '@/utils/form_validate'
export default {
  data() {
    return {
      dialog: false,
			isAdd: true,
      imageUrl_1: "",
      imageUrl_2: "",
      form: {
        id: "",
        name: "",
        money: 0,
        grade: 1,
        discount: 0,
        validDate: 0,
        onShow: true,
        onForever: true,
        onPay: true,
        image: "",
        icon: "",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请输入等级名称", trigger: "blur" }],
        money: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        grade: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        validDate: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
				discount: [{ required: true, min: 0, max: 100, validator: validateNumber, trigger: "change" }],
        image: [{ required: true, message: "请上传会员背景", trigger: "blur" }],
        icon: [{ required: true, message: "请上传会员图标", trigger: "blur" }],
        onForever: [{ required: true, message: "请选择是否永久", trigger: "blur" }],
        onShow: [{ required: true, message: "请选择是否显示", trigger: "blur" }],
        onPay: [{ required: true, message: "请选择是否允许购买", trigger: "blur" }],
        remark: [{ required: true, message: "请填写说明", trigger: "blur" }],
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
		initial(data) {
			Object
				.keys(data)
				.forEach(val => {
          if(val === 'createTime' || val === 'editTime' || val === 'deletion' || val === 'editor' || val === 'merId') {
            return
          }
					this.form[val] = data[val]
        })
        this.imageUrl_1 = this.form.image
        ? convertHttp(this.form.image)
        : ''
        this.imageUrl_2 = this.form.icon
        ? convertHttp(this.form.icon)
        : ''
		},
		getDetail() {
			this.$http_json({
				url: `/api/memberLevel/get/${this.form.id}`,
				method: "get"
			}).then(result => {
				this.initial(result.data)
			})
		},
    doSubmit() {
      this.isAdd ? (this.doAdd(), delete this.form.id) : this.doEdit();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/memberLevel/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getLevelList(this.$parent.nowPage, this.$parent.nowSize);
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
            url: "/api/memberLevel/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getLevelList(this.$parent.nowPage, this.$parent.nowSize);
          });
        } else {
          return false;
        }
      });
    },
    // 上传封面
    uploadImage_1(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl_1 = convertHttp(result.data.url)
				this.form.image = result.data.url
        this.$successMsg("上传成功！");
      });
    },
    // 上传封面
    uploadImage_2(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl_2 = convertHttp(result.data.url)
				this.form.icon = result.data.url
        this.$successMsg("上传成功！");
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        name: "",
        money: 0,
        grade: 1,
        discount: 0,
        validDate: 0,
        onShow: true,
        onForever: true,
        onPay: true,
        image: "",
        icon: "",
        remark: ""
      };
      this.imageUrl_1 = ""
      this.imageUrl_2 = ""
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