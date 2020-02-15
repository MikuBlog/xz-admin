<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加热词" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllHotWords" :disabled="!selectList.length" title="批量删除热词" circle></el-button>
					</div>
					<el-table ref="table" :data="hotWordsList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="name" label="热词名称" :show-overflow-tooltip="true" />
						<el-table-column label="排序" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag type="primary">{{ scope.row.sort }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="状态" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag :type="scope.row.enabled ? 'primary' : 'info'">{{ scope.row.enabled ? '显示' : '隐藏' }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteHotWords(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getHotWordsList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllHotWords="deleteAllHotWords" />
		<ImagePreview :show-modal.sync="isShow" :url="url" />
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
