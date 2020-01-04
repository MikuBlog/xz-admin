<template>
  <el-dialog :visible.sync="dialog" :close-on-click-modal="false" title="七牛云配置" append-to-body width="580px" v-dialogDrag>
    <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="110px">
      <el-form-item label="Access Key" prop="accessKey">
        <el-input v-model="form.accessKey" style="width: 95%" placeholder="accessKey，在安全中心，秘钥管理中查看" />
      </el-form-item>
      <el-form-item label="Secret Key" prop="secretKey">
        <el-input v-model="form.secretKey" type="password" style="width: 95%;" placeholder="secretKey，在安全中心，秘钥管理中查看" />
      </el-form-item>
      <el-form-item label="空间名称" prop="bucket">
        <el-input v-model="form.bucket" style="width: 95%;" placeholder="存储空间名称作为唯一的 Bucket 识别符" />
      </el-form-item>
      <el-form-item label="外链域名" prop="host">
        <el-input v-model="form.host" style="width: 95%;" placeholder="外链域名，可自定义，需在七牛云绑定" />
      </el-form-item>
      <el-form-item label="存储区域" prop="port">
        <el-select v-model="form.zone" placeholder="请选择存储区域" class="select-input">
          <el-option
            v-for="item in zones"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="空间类型" prop="host">
        <el-radio v-model="form.type" label="公开">公开</el-radio>
        <el-radio v-model="form.type" label="私有">私有</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog = false" size="small">取消</el-button>
      <el-button type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      zones: ['华东', '华北', '华南', '北美', '东南亚'], dialog: false,
      form: { accessKey: '', secretKey: '', bucket: '', host: '', zone: '', type: '' },
      rules: {
        accessKey: [
          { required: true, message: '请输入accessKey', trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '请输入secretKey', trigger: 'blur' }
        ],
        bucket: [
          { required: true, message: '请输入空间名称', trigger: 'blur' }
        ],
        host: [
          { required: true, message: '请输入外链域名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '空间类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getConfigData() {
      this.$http_json({
				url: "/api/qiNiuContent/getConfig",
				method: "get"
			}).then(result => {
				for(let key in result.data) {
					this.form[key] = result.data[key]
				}
			})
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
					this.$http_json({
						url: "/api/qiNiuContent/config",
						method: "post",
						data: this.form
					}).then(result => {
						this.$successMsg('修改成功')
						this.dialog = false
					})
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>