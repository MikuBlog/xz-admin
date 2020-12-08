<template>
  <el-dialog
    :visible.sync="dialog"
    append-to-body
    v-dialogDrag
    :close-on-click-modal="false"
    width="550px"
    @close="updateList"
    title="文件上传"
  >
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="文件名">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          ref="upload"
          drag
          multiple
          class="upload"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError"
          :headers="headers"
          :action="`${fileUploadApi}?name=${form.name}`"
        >
          <div class="upload-box">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </div>
          <div slot="tip" class="el-upload__tip">可上传任意格式文件，且不超过100M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialog = false">取消</el-button>
      <el-button type="primary" @click="updateList" size="small" :loading="isLoading">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      fileUploadApi: `${baseUrl}/api/localStorage/upload`,
      pictures: [],
      isLoading: false,
      dialog: false,
      headers: {
        Authorization: "Bearer " + this.$getMemoryPmt("token")
      },
      form: {
        name: ""
      }
    };
  },
	created() {
		document.addEventListener('keypress', this.submitEnter)
	},
	beforeDestroy() {
		document.removeEventListener('keypress', this.submitEnter)
	},
  methods: {
		submitEnter(e) {
			e.keyCode === 13 && this.dialog === true && this.updateList()
		},
    // 刷新列表
    updateList() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      let isLt2M = true
      this.isLoading = true
      isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      this.form.name = file.name
      return isLt2M
    },
    handleSuccess() {
      this.isLoading = false
      this.$successMsg("上传成功");
      this.form.name = ""
      this.$refs.upload.clearFiles();
      this.$parent.getFileList(this.$parent.nowPage, this.$parent.nowSize);
      this.dialog = false
    },
    // 上传失败
    handleError() {
      this.$errorMsg("上传失败");
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  /deep/ {
    .el-upload-dragger {
      width: 370px!important;
    }
  }
}
</style>
