<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索秒杀标题" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="toAddCombinationPage" title="添加秒杀产品" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllCombination" :disabled="!selectList.length" title="批量删除秒杀产品" circle></el-button>
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="list" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="产品封面" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
							</template>
						</el-table-column>
						<el-table-column prop="name" label="秒杀标题" :show-overflow-tooltip="true" />
            <el-table-column prop="seckillPrice" label="秒杀价(元)" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="seckillDiscount" label="秒杀折扣(%)" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="sales" label="销量" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <div class="name-wrapper">{{ scope.row.sales || 0 }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="effectiveHour" label="优惠类型" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.activityType === 1
                ? 'warning'
                : scope.row.activityType === 2 
                ? 'success'
                : 'warning'">{{ scope.row.status === 1
                ? '折扣'
                : scope.row.activityType === 2 
                ? '返现'
                : '降价' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="effectiveHour" label="秒杀状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1
                ? 'info'
                : scope.row.status === 2 
                ? 'primary'
                : 'warning'">{{ scope.row.status === 1
                ? '未开始'
                : scope.row.status === 2 
                ? '进行中'
                : '已结束' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" :show-overflow-tooltip="true" />
            <el-table-column prop="stopTime" label="结束时间" :show-overflow-tooltip="true" />
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="$router.push({
                  path: `/home/edit_seckill?id=${scope.row.id}`
                })"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteArticle(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getCombinationList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
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
