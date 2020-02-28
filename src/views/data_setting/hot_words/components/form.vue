<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增热词' : '编辑热词'"
    width="500px"
    v-dialogDrag
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="热词名称" prop="name">
        <el-input v-model="form.name" style="width: 350px;" />
      </el-form-item>
			<el-form-item label="排序" prop="sort">
			  <el-input-number controls-position="right" v-model="form.sort" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="是否显示" prop="enabled">
			  <el-radio-group v-model="form.enabled">
			    <el-radio :label="true">是</el-radio>
			    <el-radio :label="false">否</el-radio>
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
export default {
  data() {
    const numberValidate = (rule, value, callback) => {
      value < 0 || value > 999
        ? callback(new Error("排序范围在0~999之间"))
        : callback();
    };
    return {
      dialog: false,
			isAdd: true,
      imageUrl: "",
      form: {
        id: "",
        name: "",
				enabled: true,
        sort: 999,
				groupName: "routine_hot_search"
      },
      rules: {
        name: [{ required: true, message: "请输入热词名称", trigger: "blur" }],
        sort: [{ required: true, validator: numberValidate, trigger: "blur" }],
				enabled: [{ required: true, message: "请选择显示状态", trigger: "blur" }]
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
			this.imageUrl = convertHttp(this.form.image)
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
							sort: this.form.sort,
							value: JSON.stringify(this.form),
							enabled: this.form.enabled,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getHotWordsList(this.$parent.nowPage, this.$parent.nowSize);
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
							sort: this.form.sort,
							value: JSON.stringify(this.form),
							enabled: this.form.enabled,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getHotWordsList(this.$parent.nowPage, this.$parent.nowSize);
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
        name: "",
				enabled: true,
        sort: 999,
				groupName: "routine_hot_search"
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