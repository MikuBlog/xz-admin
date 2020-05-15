<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="toAddArticlePage" title="添加资讯" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllArticle" :disabled="!selectList.length" title="批量删除资讯" circle></el-button>
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="articleList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="title" label="标题" :show-overflow-tooltip="true" />
						<el-table-column prop="type" label="分类" :show-overflow-tooltip="true">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									{{ scope.row.types.map(val => val.name).join("、") }}
								</div>
							</template>
						</el-table-column>
						<el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="缩略图" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
							</template>
						</el-table-column>
						<el-table-column label="是否显示" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag :type="scope.row.isShow ? '' : 'info'">{{ scope.row.isShow ? '是' : '否' }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="是否置顶" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag :type="scope.row.isTop ? '' : 'info'">{{ scope.row.isTop ? '是' : '否' }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="排序" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag type="primary">{{ scope.row.sort }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="toEditArticlePage(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteArticle(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getArticleList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @toAddArticlePage="toAddArticlePage" @deleteAllArticle="deleteAllArticle" />
		<ImagePreview :show-modal.sync="isShow" :url="url" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
export default {
  mixins: [Operation, Property]
};
</script>
