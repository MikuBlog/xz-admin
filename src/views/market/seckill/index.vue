<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加秒杀配置" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAll" :disabled="!selectList.length" title="批量删除秒杀配置" circle></el-button>
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="list" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="startTime" label="开启时间(时)" :show-overflow-tooltip="true" align="center" />
						<el-table-column prop="continueTime" label="结束时间(时)" :show-overflow-tooltip="true" align="center" />
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteItem(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
    <eForm ref="form" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import eForm from './components/form'
export default {
  mixins: [Operation, Property],
	components: { eForm }
};
</script>
