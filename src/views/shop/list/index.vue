<template>
	<div class="article-type-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索门店名称" class="search-input margin-box"  @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加门店" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllBrand" :disabled="!selectList.length" title="批量删除门店" circle></el-button>
					</div>
					<el-table ref="table"  :max-height="$store.state.tableHeight.tableHeight" :data="list" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="name" label="门店名称" :show-overflow-tooltip="true" />
            <el-table-column prop="phone" label="门店电话" :show-overflow-tooltip="true" />
            <el-table-column prop="address" label="门店地址" :show-overflow-tooltip="true">
              <template slot-scope="scope">
            		<div class="name-wrapper">
                  {{ scope.row.province + scope.row.city + scope.row.district }} {{ scope.row.detailAddress }}
                </div>
            	</template>
            </el-table-column>
            <el-table-column prop="name" label="店长姓名" :show-overflow-tooltip="true" />
            <el-table-column :show-overflow-tooltip="true" prop="url" label="门店Logo" align="center">
            	<template slot-scope="scope">
            		<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
            	</template>
            </el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteBrand(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
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
