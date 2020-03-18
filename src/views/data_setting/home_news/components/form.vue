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
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 350px;" />
      </el-form-item>
			<el-form-item label="排序" prop="sort">
			  <el-input-number v-model="form.sort" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="链接url" prop="linkUrl">
			  <el-input v-model="form.linkUrl" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="小程序跳转url" prop="wxurl">
			  <el-input v-model="form.xcxUrl" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="滚动内容" prop="content">
			  <el-input type="textarea" :rows="4" v-model="form.content" style="width: 350px;" />
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
import { validateNumber, validateUrl } from '@/utils/form_validate'
export default {
  data() {
    return {
      dialog: false,
			isAdd: true,
      imageUrl: "",
      form: {
        id: "",
        name: "",
				linkUrl: "",
				xcxUrl: "",
				enabled: true,
        sort: 999,
        content: "",
				groupName: "routine_home_roll_news"
      },
      rules: {
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        sort: [{ required: true, min: 0, max: 999, validator: validateNumber, trigger: "change" }],
				content: [{ required: true, message: "请输入滚动内容", trigger: "blur" }],
				enabled: [{ required: true, message: "请选择显示状态", trigger: "blur" }],
				linkUrl: [{ required: false, validator: validateUrl, trigger: 'change' }]
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
							sort: this.form.sort,
							value: JSON.stringify(this.form),
							enabled: this.form.enabled,
							groupName: this.form.groupName
						}
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getNewsList(this.$parent.nowPage, this.$parent.nowSize);
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
            this.$parent.getNewsList(this.$parent.nowPage, this.$parent.nowSize);
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
        linkUrl: "",
        xcxUrl: "",
        enabled: true,
        sort: 999,
        image: "",
				groupName: "routine_home_roll_news"
      };
			this.imageUrl = ""
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