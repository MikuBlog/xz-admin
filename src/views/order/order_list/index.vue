<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部订单" name="null"></el-tab-pane>
            <el-tab-pane label="未支付" name="101"></el-tab-pane>
            <el-tab-pane label="未发货" name="201"></el-tab-pane>
            <el-tab-pane label="待收货" name="301"></el-tab-pane>
            <el-tab-pane label="待评价" name="401"></el-tab-pane>
            <el-tab-pane label="交易完成" name="501"></el-tab-pane>
            <el-tab-pane label="退款中" name="-101"></el-tab-pane>
            <el-tab-pane label="已退款" name="-200"></el-tab-pane>
            <!-- <el-tab-pane label="已删除" name="-3"></el-tab-pane> -->
          </el-tabs>
					<div class="search">
            <el-input v-model="searchVal" placeholder="搜索关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
            <el-date-picker
              v-model="date"
              class="select-input margin-box"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getDate"
            ></el-date-picker>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllComment" :disabled="!selectList.length" title="批量删除订单" circle></el-button>
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="list" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品信息" class="expand-line" :key="ind">
                    <div v-for="(item, ind) in props.row.orderCartInfos" :key="ind">
                      <img width="30" height="30" style="margin-right: 5px; vertical-align: top" :src="convertHttp(item.image)" @click="(isShow = true), (url = convertHttp(item.image))">
                      <span>{{ item.spuName }} | </span>
                      <span>￥{{ item.salesPrice }} </span>
                      <span>x {{item.number}}</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="订单备注" class="expand-line">
                    <span>{{ props.row.remark || "无" }}</span>
                  </el-form-item>
                  <el-form-item label="退款原因" class="expand-line" v-if="props.row.refundReasonWap">
                    <span>{{ props.row.refundReasonWap || "无" }}</span>
                  </el-form-item>
                  <el-form-item label="退款备注" class="expand-line" v-if="props.row.refundReasonWapExplain">
                    <span>{{ props.row.refundReasonWapExplain || "无" }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="订单编号" :show-overflow-tooltip="true" />
						<el-table-column prop="receiverName" label="用户昵称" :show-overflow-tooltip="true" />
            <el-table-column prop="payAmount" label="实际支付" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div class="name-wrapper">
                  ￥{{ scope.row.payAmount.toFixed(2) }}
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="payType" label="支付状态" :show-overflow-tooltip="true" /> -->
            <el-table-column prop="payPrice" label="订单状态" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 101
                ? 'info'
                : scope.row.status === 201
                ? 'info'
                : scope.row.status === 301
                ? 'primary'
                : scope.row.status === 401
                ? 'suuccess'
                : scope.row.status === 501
                ? 'success'
                : scope.row.status === -101
                ? 'primary'
                : scope.row.status === -200
                ? 'success'
                : 'danger'">{{ scope.row.status === 101
                ? '未付款'
                : scope.row.status === 201
                ? '未发货'
                : scope.row.status === 301
                ? '待收货'
                : scope.row.status === 401
                ? '待评价'
                : scope.row.status === 501
                ? '已完成'
                : scope.row.status === -101
                ? '退款中'
                : scope.row.status === -200
                ? '已退款'
                : '已删除' }}</el-tag>
              </template>
            </el-table-column>
						<el-table-column label="最新编辑时间" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.editTime }}</div>
							</template>
						</el-table-column>
            <el-table-column label="创建时间" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="250">
							<template slot-scope="scope">
                <el-button v-if="scope.row.status === 201" type="primary" icon="el-icon-s-promotion" @click="sendDelivery(scope.row)" title="发货"></el-button>
                <el-button v-if="scope.row.status === -101" type="warning" icon="el-icon-refresh-left" @click="refund(scope.row)" title="允许退款"></el-button>
								<el-button type="success" icon="el-icon-view" @click="showDetailBox(scope.row)" title="查看详情"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteComment(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @deleteAllComment="deleteAllComment" />
		<ImagePreview :show-modal.sync="isShow" :url="url" />
    <eForm ref="form" />
    <refund ref="refund" />
    <detail ref="detail" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import eForm from './components/form'
import refund from './components/refund'
import detail from './components/detail'
export default {
  mixins: [Operation, Property],
  components: { eForm, refund, detail }
};
</script>
