<template>
	<div class="editor">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div slot="header"><span style="font-size: 1rem">富文本编辑器</span></div>
					<Tinymce v-model="msg" />
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			msg: "<h1 style='text-align: center'>欢迎使用tinymce富文本编辑器</h1>"
		};
	}
};
</script>

<style lang="scss" scoped>
.content-box {
	position: relative;
	margin-top: 5rem;
}
</style>
