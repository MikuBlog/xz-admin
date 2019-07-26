<template>
    <el-dialog :visible.sync="dialog" append-to-body width="600px" @close="updateList">
      <el-upload
        :on-preview="handlePictureCardPreview"
        :before-remove="handleBeforeRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :headers="headers"
        :file-list="fileList"
        :action="imagesUploadApi"
        list-type="picture-card">
        <i class="el-icon-plus"/>
      </el-upload>
      <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
        <img :src="dialogImageUrl" width="100%" alt="">
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateList">确认</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            imagesUploadApi: "http://47.106.187.102:8008/api/picture/upload",
            fileList: [],
            pictures: [],
            dialogImageUrl: "",
            dialog: false,
            dialogVisible: false,
            headers: {
                'Authorization': 'Bearer ' + this.$getMemoryPmt('token')
            },
        }
    },
    methods: {
        // 刷新列表
        updateList() {
            this.fileList = []
            this.dialogVisible = false
            this.dialogImageUrl = ''
            this.dialog = false
            this.$emit("updatePictureList")
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        handleSuccess(response, file, fileList) {
            const uid = file.uid
            const id = response.data.id
            this.pictures.push({ uid, id })
        },
        handleBeforeRemove(file, fileList) {
            for (let i = 0; i < this.pictures.length; i++) {
                if (this.pictures[i].uid === file.uid) {
                    this.$http_json({
                        url: "/api/picture/del",
                        method: "post",
                        data: [this.pictures[i].id]
                    })
                    return true
                }
            }
        },
        // 上传失败
        handleError() {
            this.$errorMsg("上传失败")
        }
    }
}
</script>

<style>

</style>
