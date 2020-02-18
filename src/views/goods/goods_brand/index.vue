<template>
	<div class="article-type-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索品牌名称" class="search-input margin-box"  @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加品牌" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllBrand" :disabled="!selectList.length" title="批量删除资讯" circle></el-button>
					</div>
					<el-table ref="table" :data="brandList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="name" label="品牌名称" :show-overflow-tooltip="true" />
            <el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="品牌图片" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
            	</template>
            </el-table-column>
            <el-table-column prop="sort" align="center" label="排序">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.sort }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="enabled" label="是否显示" align="center" width="80px">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.isShow ? 'success' : 'info'"
                >{{scope.row.isShow ? '是' : '否'}}</el-tag>
              </template>
            </el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteBrand(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getBrandList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllBrand="deleteAllBrand" />
    <ImagePreview :show-modal.sync="isShow" :url="url" />
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
