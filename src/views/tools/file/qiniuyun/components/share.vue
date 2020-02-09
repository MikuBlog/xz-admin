<template>
	<el-dialog
	  title="分享链接"
	  :visible.sync="dialogVisible"
	  width="300px"
		append-to-body
		v-dialogDrag
	  >
		<el-radio-group v-model="time">
	    <el-radio label="604800">7天</el-radio>
	    <el-radio label="3153600000">永久</el-radio>
	  </el-radio-group>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
	    <el-button type="primary" @click="copyLink" size="small">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				time: "604800",
				fileId: ""
			}
		},
		created() {
			document.addEventListener('keypress', this.submitEnter)
		},
		beforeDestroy() {
			document.removeEventListener('keypress', this.submitEnter)
		},
		methods: {
			submitEnter(e) {
				e.keyCode === 13 && this.dialogVisible === true && this.copyLink()
			},
			// 删除所有缓存
			copyLink() {
			  this.$http_json({
			  	url: `/api/qiNiuContent/downloadStorage?id=${this.fileId}&expireInSeconds=${this.time}`,
			  	method: "get"
			  }).then(result => {
					this.$copyText(result.data.url)
					this.$successMsg("复制链接成功")
					this.dialogVisible = false
			  })
			}
		}
	}
</script>

<style>
</style>
