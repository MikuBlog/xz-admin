<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
            <el-input v-model="searchVal" placeholder="搜索关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
					</div>
					<el-table ref="table" :data="userList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column prop="nickname" label="用户昵称" :show-overflow-tooltip="true" />
            <el-table-column :show-overflow-tooltip="true" prop="url" label="用户头像" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
							</template>
						</el-table-column>
            <el-table-column prop="phone" label="手机号码" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="nowMoney" label="用户余额" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="brokeragePrice" label="佣金金额" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="integral" label="用户积分" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="spreadCount" label="推荐人数" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="payCount" label="购买次数" :show-overflow-tooltip="true" align="center"/>
            <el-table-column label="状态" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag :type="scope.row.status ? 'primary' : 'info'">{{ scope.row.status ? '是' : '否' }}</el-tag>
							</template>
						</el-table-column>
            <el-table-column label="用户来源" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag :type="scope.row.userType === '小程序' 
                ? 'warning' 
                : scope.row.userType === '公众号'
                ? 'primary'
                : 'success'">{{ scope.row.userType }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  trigger="click"
                  >
                  <div align="center">
                    <el-button type="primary" @click="showEditBox(scope.row)">编辑用户</el-button>
                  </div>
                  <div align="center" style="margin-top: .5rem">
                    <el-button type="warning" 
                    v-if="scope.row.status === 1"
                    @click="changeStatus(scope.row, 0)">冻结用户</el-button>
                    <el-button type="success" 
                    v-else
                    @click="changeStatus(scope.row, 1)">启用用户</el-button>
                  </div>
                  <div align="center" style="margin-top: .5rem">
                    <el-button type="info" 
                    @click="showEditMoneyBox(scope.row)">修改余额</el-button>
                  </div>
                  <el-button slot="reference" type="primary">操作<i class="el-icon-caret-bottom el-icon--right"></i></el-button>
                </el-popover>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getUserList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<ImagePreview :show-modal.sync="isShow" :url="url" />
    <eForm ref="form" />
    <Money ref="money" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
import eForm from './components/form'
import Money from './components/money'
export default {
  mixins: [Operation, Property],
  components: { eForm, Money }
};
</script>
