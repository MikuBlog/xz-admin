<template>
  <el-dialog :visible.sync="dialog" title="编辑品牌" width="500px" append-to-body v-dialogDrag @close="hideBox">
    <el-form
      status-icon
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      @submit.native.prevent="editBrand"
      label-width="100px"
    >
      <el-form-item label="品牌名称" prop="name">
        <el-input v-model="form.name" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input type="number" v-model="form.sort" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-radio-group v-model="form.isShow">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
      <el-button type="text" @click="hideBox" size="small">取消</el-button>
      <el-button type="primary" @click="editBrand" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    const numberValidate = (rule, value, callback) => {
      value < 0 || value > 999
        ? callback(new Error("排序范围在0~999之间"))
        : callback();
    };
    return {
      dialog: false,
      imageUrl: "",
      form: {
        id: "",
        name: "",
        sort: 999,
        isShow: 1,
        image: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "change"
          }
        ],
        sort: [{ required: true, validator: numberValidate, trigger: "blur" }],
        isShow: [{ required: true, message: "请选择显示状态", trigger: "blur" }]
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
			e.keyCode === 13 && this.dialog === true && this.editBrand()
		},
    initialDetail(data) {
      this.form.name = data.name
      this.form.sort = data.sort
      this.form.isShow = data.isShow
      this.form.image = data.image
      this.imageUrl = data.image
      ? convertHttp(data.image)
      : ''
    },
    getDetail() {
      this.$http_json({
        url: `/api/productBrand/get/${this.form.id}`,
        method: "get"
      }).then(result => {
        this.initialDetail(result.data)
      });
    },
    hideBox() {
      this.dialog = false;
      this.resetForm();
    },
    uploadImage(param) {
      this.$http_file({
        url: "/api/localStorage/upload",
        method: "post",
        data: {
          file: param.file
        },
        timeout: 100000
      }).then(result => {
        this.imageUrl = convertHttp(result.data.url);
        this.form.image = result.data.url;
        this.$successMsg("上传成功！");
      });
    },
    editBrand() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/api/productBrand/edit",
            method: "post",
            data: this.form
          }).then(result => {
            this.$successMsg("编辑成功");
            this.hideBox();
            this.$parent.getBrandList(
              this.$parent.nowPage,
              this.$parent.nowSize
            );
          });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      try {
        this.form = {
          name: "",
          sort: 999,
          isShow: 1,
          image: ""
        };
        this.imageUrl = "";
        this.$refs.form.resetFields();
      } catch (e) {}
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