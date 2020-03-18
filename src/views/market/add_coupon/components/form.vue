<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增优惠券' : '编辑优惠券'"
    width="530px"
    @close="hideBox"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
      <el-form-item label="优惠券名称" prop="title">
        <el-input v-model="form.title" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="优惠券面值" prop="couponPrice">
			  <el-input v-model="form.couponPrice" style="width: 350px;">
          <template slot="append">元</template>
			  </el-input>
			</el-form-item>
      <el-form-item label="最低消费" prop="useMinPrice">
			  <el-input v-model="form.useMinPrice" style="width: 350px;">
          <template slot="append">元</template>
			  </el-input>
			</el-form-item>
      <el-form-item label="兑换消耗积分" prop="integral">
			  <el-input v-model="form.integral" style="width: 350px;">
          <template slot="append">分</template>
			  </el-input>
			</el-form-item>
			<el-form-item label="有效天数" prop="couponTime">
			  <el-input v-model="form.couponTime" style="width: 350px;">
          <template slot="append">天</template>
			  </el-input>
			</el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number controls-position="right" v-model="form.sort" style="width: 350px;" />
      </el-form-item>
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
import { validateNumber } from '@/utils/form_validate'
export default {
  data() {
    return {
      dialog: false,
			isAdd: true,
      form: {
        id: "",
        title: "",
        couponPrice: 0,
        useMinPrice: 1,
        integral: 0,
        couponTime: 0,
        sort: 999,
        status: 1
      },
      rules: {
        title: [{ required: true, message: "请输入优惠券名称", trigger: "blur" }],
        couponPrice: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        useMinPrice: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        integral: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        couponTime: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        sort: [{ required: true, min: 0, max: 999, validator: validateNumber, trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
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
          if(val === 'createTime' || val === 'editTime' || val === 'deletion' || val === 'editor') {
            return
          }
					this.form[val] = data[val]
        })
		},
		getDetail() {
			this.$http_json({
				url: `/api/coupon/get/${this.form.id}`,
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
            url: "/api/coupon/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getCouponList(this.$parent.nowPage, this.$parent.nowSize);
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
            url: "/api/coupon/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getCouponList(this.$parent.nowPage, this.$parent.nowSize);
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
        title: "",
        couponPrice: 0,
        useMinPrice: 1,
        integral: 0,
        couponTime: 0,
        sort: 999,
        status: 1
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