<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增滚动新闻' : '编辑滚动新闻'"
    width="500px"
    v-dialogDrag
    @close="hideBox"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
			<el-form-item label="开启时间(时)" prop="startTime">
			  <el-input-number :min="0" :max="24" v-model="form.startTime"/>
			</el-form-item>
      <el-form-item label="持续时间(时)" prop="continueTime">
			  <el-input-number :min="0" v-model="form.continueTime"/>
			</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="hideBox">取消</el-button>
      <el-button type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validateNumber, validateUrl } from '@/utils/form_validate'
export default {
  data() {
    return {
      dialog: false,
			isAdd: true,
      imageUrl: "",
      form: {
        id: "",
        startTime: 0,
        continueTime: 0,
				groupName: "seckill_time"
      },
      rules: {
        startTime: [{ required: true, message: "请输入开始时间", trigger: "blur" }],
        continueTime: [{ required: true, message: "请输入持续时间", trigger: "change" }]
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
			data.value = JSON.parse(data.value)
			Object
				.keys(data.value)
				.forEach(val => {
					if(val !== 'id') {
						this.form[val] = data.value[val]
					}
				})
			this.form.id = data.id
			this.form.sort = +this.form.sort
		},
		getDetail() {
			this.$http_json({
				url: `/api/groupData/get/${this.form.id}`,
				method: "get"
			}).then(result => {
				this.initial(result.data)
			})
		},
    doSubmit() {
      this.isAdd ? this.doAdd() : this.doEdit();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/groupData/add",
            method: "post",
            data: {
							sort: 0,
							value: JSON.stringify(this.form),
							enabled: true,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getList(this.$parent.nowPage, this.$parent.nowSize);
          });
        } else {
          return false;
        }
      });
    },
    doEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
					this.form.value = JSON.parse(JSON.stringify(this.form))
          this.$http_json({
            url: "/api/groupData/edit",
            method: "post",
            data: {
							id: this.form.id,
							sort: 0,
							value: JSON.stringify(this.form),
							enabled: true,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getList(this.$parent.nowPage, this.$parent.nowSize);
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
        startTime: 0,
        continueTime: 0,
				groupName: "seckill_time"
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