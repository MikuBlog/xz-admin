<template>
  <el-dialog
    append-to-body
    :before-close="hideBox"
    :visible.sync="dialog"
    :title="isAdd ? '新增菜单项' : '编辑菜单项'"
    width="500px"
    v-dialogDrag
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 350px;" />
      </el-form-item>
			<el-form-item label="排序" prop="sort">
			  <el-input type="number" v-model="form.sort" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="链接url" prop="url">
			  <el-input v-model="form.url" style="width: 350px;" />
			</el-form-item>
			<el-form-item label="小程序跳转url" prop="wxurl">
			  <el-input v-model="form.url" style="width: 350px;" />
			</el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :http-request="uploadImage"
          :show-file-list="false"
          action="string"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    const numberValidate = (rule, value, callback) => {
      value < 0 || value > 999
        ? callback(new Error("排序范围在0~999之间"))
        : callback();
    };
    return {
      dialog: false,
			isAdd: true,
      imageUrl: "",
      cates: [],
      form: {
        id: "",
        name: "",
				url: "",
				wxurl: "",
        sort: 999,
        pic: "",
      },
      rules: {
        name: [{ required: true, message: "请输入商品分类名", trigger: "blur" }],
        sort: [{ required: true, validator: numberValidate, trigger: "blur" }],
      }
    };
  },
  methods: {
    hideBox() {
      this.resetForm();
    },
    // 上传封面
    uploadImage(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl = convertHttp(result.data.url)
        this.$successMsg("上传成功！");
      });
    },
    doSubmit() {
      this.isAdd ? this.doAdd() : this.doEdit();
    },
    doAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          delete this.form.id;
          this.$http_json({
            url: "/api/user/add",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("添加成功");
            this.hideBox();
            this.$parent.getSlideList();
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
            url: "/api/user/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getSlideList();
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
				url: "",
				wxurl: "",
        cateName: "",
        sort: 999,
        pic: "",
      };
    },
    getTree() {}
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