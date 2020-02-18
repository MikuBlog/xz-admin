<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="blurry" placeholder="搜索关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="toAddGoodsPage" title="添加商品" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllGoods" :disabled="!selectList.length" title="批量删除商品" circle></el-button>
					</div>
					<el-table ref="table" :data="goodsList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="商品图片" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.coverImage || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.url)" />
							</template>
						</el-table-column>
						<el-table-column prop="title" label="商品名称" :show-overflow-tooltip="true" />
            <el-table-column prop="title" label="分类名称" :show-overflow-tooltip="true" />
            <el-table-column prop="title" label="商品价格" :show-overflow-tooltip="true" />
            <el-table-column prop="title" label="销量" :show-overflow-tooltip="true" />
            <el-table-column prop="title" label="库存" :show-overflow-tooltip="true" />
						<el-table-column label="状态" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag :type="scope.row.isShow ? '' : 'info'">{{ scope.row.isShow ? '是' : '否' }}</el-tag>
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
								<el-button type="primary" icon="el-icon-edit" @click="toEditGoodsPage(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteGoods(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getGoodsList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @toAddGoodsPage="toAddGoodsPage" @deleteAllGoods="deleteAllGoods" />
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
