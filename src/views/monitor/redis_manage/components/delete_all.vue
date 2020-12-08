<template>
	<el-dialog
	  title="清除缓存"
	  :visible.sync="dialogVisible"
	  width="300px"
		append-to-body
		v-dialogDrag
	  >
		<el-radio-group v-model="cache">
	    <el-radio label="1">仅保留用户数据</el-radio>
	    <el-radio label="0">清除所有缓存</el-radio>
	  </el-radio-group>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
	    <el-button type="primary" @click="deleteAll" size="small" :loading="isLoading">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				isLoading: false,
				cache: "1"
			}
		},
		methods: {
			// 删除所有缓存
			deleteAll() {
				this.isLoading = true
			  this.$http_json({
			    url: `/api/redis/delAll/${this.cache}`,
			    method: "post"
			  }).then(() => {
					this.isLoading = false
			    this.$successMsg("删除成功");
			    this.$parent.getRedisList();
					this.dialogVisible = false
			  });
			}
		}
	}
</script>

<style>
</style>
