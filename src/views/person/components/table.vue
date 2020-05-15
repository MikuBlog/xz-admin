<template>
	<div>
		<div class="search">
			<el-input v-model="searchVal" placeholder="搜索行为名称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
			<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
			<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
		</div>
		<el-table :data="operationLogList" :max-height="$store.state.tableHeight.tableHeight" style="width: 100%" highlight-current-row stripe>
			<el-table-column label="行为" show-overflow-tooltip>
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.description }}</span>
				</template>
			</el-table-column>
			<el-table-column label="IP" show-overflow-tooltip>
				<template slot-scope="scope">
					<div slot="reference">{{ scope.row.requestIp }}</div>
				</template>
			</el-table-column>
			<el-table-column label="IP来源" show-overflow-tooltip>
				<template slot-scope="scope">
					<div slot="reference">{{ scope.row.address }}</div>
				</template>
			</el-table-column>
			<el-table-column label="请求耗时" align="center">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag>{{ scope.row.time }}ms</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="创建日期" width="180">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
				</template>
			</el-table-column>
		</el-table>
		<pagination ref="pagination" :get-data="getOpertionLogList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchVal: '',
			// 当前页数
			nowPage: 1,
			// 当前页条数
			nowSize: 10,
			// 总条数
			totalElements: 0,
			operationLogList: []
		};
	},
	methods: {
		// 分页处理
		initialPage(totalElements) {
			this.totalElements = totalElements;
		},
		// 初始化操作日志列表
		initialOpertionLogList(list) {
			this.operationLogList.splice(0);
			list.forEach(value => {
				this.operationLogList.push(value);
			});
		},
		// 获取操作日志信息
		getOpertionLogList(page, size) {
			this.$http_normal({
				url: `/log/page/user?page=${page - 1}&size=${size}&sort=createTime,desc${this.searchVal ? `&description=${this.searchVal}` : ''}`,
				method: 'get'
			}).then(result => {
				const data = result.data;
				this.initialPage(data.totalElements);
				this.initialOpertionLogList(data.content);
			});
		},
		refresh() {
			this.searchVal = '';
			this.$refs.pagination.toFirstPage();
		},
		// 点击搜索
		search() {
			this.$refs.pagination.toFirstPage();
		}
	}
};
</script>

<style></style>
