<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索优惠券名称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加优惠券" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllCoupon" :disabled="!selectList.length" title="批量删除优惠券" circle></el-button>
					</div>
					<el-table ref="table" :data="couponList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="title" label="优惠券名称" :show-overflow-tooltip="true" />
            <el-table-column prop="couponPrice" label="优惠券面值(元)" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="useMinPrice" label="优惠券最低消费(元)" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="couponTime" label="优惠券有效期限(天)" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="integral" label="兑换消耗积分" :show-overflow-tooltip="true" align="center"/>
						<el-table-column label="排序" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag type="primary'">{{ scope.row.sort }}</el-tag>
							</template>
						</el-table-column>
            <el-table-column prop="status" label="状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 0 
              ? 'info' 
              : scope.row.status === 1
              ? 'primary'
              : 'danger'"
                >
                  {{ scope.row.status === 0
                  ? '未使用'
                  : scope.row.status === 1
                  ? '已使用'
                  : '已过期' }}
                </el-tag>
              </template>
            </el-table-column>
						<el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="230">
							<template slot-scope="scope">
                <el-button type="success" icon="el-icon-upload2" @click="showPublishBox(scope.row)" title="发布"></el-button>
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteCoupon(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getCouponList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllCoupon="deleteAllCoupon" />
    <eForm ref="form" />
    <publishForm ref="publishForm" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import eForm from './components/form'
import publishForm from './components/publish_form'
export default {
  mixins: [Operation, Property],
  components: { eForm, publishForm }
};
</script>
