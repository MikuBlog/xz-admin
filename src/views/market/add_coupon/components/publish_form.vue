<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    title="发布优惠券"
    width="530px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="130px">
      <el-form-item label="优惠券名称" prop="couponName">
        <el-input :disabled="true" v-model="form.couponName" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="发布数量" prop="totalCount">
			  <el-input v-model="form.totalCount" style="width: 350px;">
          <template slot="append">张</template>
			  </el-input>
			</el-form-item>
      <el-form-item label="领取开始时间" prop="startTimeDate">
			  <el-date-picker
          v-model="form.startTimeDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
			</el-form-item>
      <el-form-item label="领取结束时间" prop="endTimeDate">
			  <el-date-picker
          v-model="form.endTimeDate"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
			</el-form-item>
      <el-form-item label="是否限量" prop="onPermanent">
			  <el-radio-group v-model="form.onPermanent">
			    <el-radio :label="true">是</el-radio>
			    <el-radio :label="false">否</el-radio>
			  </el-radio-group>
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
        couponId: "",
        couponName: "",
        startTimeDate: "",
        endTimeDate: "",
        totalCount: 0,
        onPermanent: true,
        status: 1
      },
      rules: {
        couponName: [{ required: false, message: "请输入优惠券名称", trigger: "blur" }],
        startTimeDate: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        endTimeDate: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
        totalCount: [{ required: true, min: 0, validator: validateNumber, trigger: "change" }],
        onPermanent: [{ required: true, message: "请选择是否限量", trigger: "blur" }],
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
			this.form.couponName = data.title
		},
		getDetail() {
			this.$http_json({
				url: `/api/coupon/get/${this.form.couponId}`,
				method: "get"
			}).then(result => {
				this.initial(result.data)
			})
		},
    doSubmit() {
      this.doAdd()
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const 
            startTime = new Date(this.form.startTimeDate.replace(/-/g, '/')).getTime(),
            endTime = new Date(this.form.endTimeDate.replace(/-/g, '/')).getTime()
          if(startTime > endTime) {
            this.$warnMsg("开始时间不能大于结束时间")
            return
          }
          this.$http_json({
            url: "/api/couponIssue/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("发布成功");
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
        couponId: "",
        couponName: "",
        startTimeDate: "",
        endTimeDate: "",
        totalCount: 0,
        onPermanent: true,
        status: 1
      };
    }
  }
};
</script>