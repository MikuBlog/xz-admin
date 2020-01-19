<template>
	<div class="box">
		<el-card class="box-card">
			<el-tabs v-model="activeName">
				<el-tab-pane label="本地存储" name="first">
					<Localstorage />
				</el-tab-pane>
				<el-tab-pane label="七牛云存储" name="second">
					<Qiniuyun />
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script>
import Localstorage from './localstorage';
import Qiniuyun from './qiniuyun';
export default {
	components: { Localstorage, Qiniuyun },
	data() {
		return {
			activeName: "first"
		}
	}
}
</script>

<style></style>
