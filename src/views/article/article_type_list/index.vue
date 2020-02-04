<template>
	<div class="article-type-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索分类名称" class="search-input margin-box" @keyup.native="searchEnter"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加资讯分类" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllArticle" :disabled="!selectList.length" title="批量删除资讯" circle></el-button>
					</div>
					<el-table ref="table" :data="articleTypeList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="name" label="分类名称" :show-overflow-tooltip="true" />
						<!-- <el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column> -->
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteArticle(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getArticleTypeList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllArticle="deleteAllArticle" />
		<AddForm ref="addForm" />
		<EditForm ref="editForm" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import AddForm from './components/add.vue';
import EditForm from './components/edit.vue';
export default {
  mixins: [Operation, Property],
	components: { AddForm, EditForm }
};
</script>
