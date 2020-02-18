<template>
	<div class="wx-pay">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="toAddPayPage" title="添加支付配置" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllPay" :disabled="!selectList.length" title="批量删除支付配置" circle></el-button>
					</div>
					<el-table ref="table" :data="articleList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column type="expand">
						  <template slot-scope="props">
						    <el-form label-position="left" inline class="demo-table-expand">
						      <el-form-item label="简介" class="expand-line">
						        <span>{{ props.row.remark }}</span>
						      </el-form-item>
						    </el-form>
						  </template>
						</el-table-column>
						<el-table-column prop="appid" label="AppID" :show-overflow-tooltip="true" />
						<el-table-column prop="mchId" label="商户号" :show-overflow-tooltip="true" />
						<el-table-column label="微信证书" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">
									<el-tag :type="scope.row.mchPath ? '' : 'info'">{{ scope.row.mchPath ? '已上传' : '未上传' }}</el-tag>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="toEditPayPage(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deletePay(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getPayList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @toAddPayPage="toAddPayPage" @deleteAllPay="deleteAllPay" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
export default {
  mixins: [Operation, Property]
};
</script>
