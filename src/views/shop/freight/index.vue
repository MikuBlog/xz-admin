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
						<el-table-column prop="name" label="名字" :show-overflow-tooltip="true" />
            <el-table-column prop="packagePrice" label="包装费(元)" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="address" label="按件/按重" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
            		<el-tag :type="scope.row.freightType
                ? 'warning'
                : 'success'">{{ scope.row.freightType
                  ? '按重'
                  : '按件'}}</el-tag>
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
