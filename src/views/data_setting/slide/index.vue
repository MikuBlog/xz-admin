<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索标题" class="search-input margin-box" @keyup.native="searchEnter"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加资讯" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllSlide" :disabled="!selectList.length" title="批量删除资讯" circle></el-button>
					</div>
					<el-table ref="table" :data="slideList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="title" label="标题" :show-overflow-tooltip="true" />
						<el-table-column prop="title" label="链接url" :show-overflow-tooltip="true" />
						<el-table-column prop="title" label="小程序跳转url" :show-overflow-tooltip="true" />
						<el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="缩略图" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.coverImage || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.url)" />
							</template>
						</el-table-column>
						<el-table-column label="排序" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag type="primary">{{ scope.row.sort }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteSlide(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllSlide="deleteAllSlide" />
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
