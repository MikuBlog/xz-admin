<template>
  <el-card>
		<el-tabs v-model="activeName" type="card">
		  <el-tab-pane v-for="item in data" :key="item.name" :lazy="true" :label="item.name" :name="item.name">
		    <Codemirror v-model="item.content" />
		  </el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {
  data() {
    return {
      data: null, height: '', activeName: 'Entity'
    }
  },
  created() {
		this.$http_json({
			url: `/api/generator/handle/${this.$route.query.tableName}/1`,
			method: "post"
		}).then(result => {
			this.data = result.data
		})
  }
}
</script>