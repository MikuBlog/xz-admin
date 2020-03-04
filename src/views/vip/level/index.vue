<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-input v-model="searchVal" placeholder="搜索等级名称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加会员等级" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllLevel" :disabled="!selectList.length" title="批量删除会员等级" circle></el-button>
					</div>
					<el-table ref="table" :data="levelList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="说明" class="expand-line">
                    <span>{{ props.row.remark }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="url" label="等级图标" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
							</template>
						</el-table-column>
						<el-table-column prop="name" label="等级名称" :show-overflow-tooltip="true" />
            <el-table-column prop="money" label="会员价格(元)" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="grade" label="会员等级" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="discount" label="销售折扣(%)" :show-overflow-tooltip="true" align="center"/>
            <el-table-column prop="validDate" label="有效时间(天)" :show-overflow-tooltip="true" align="center"/>
						<el-table-column label="是否永久" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag :type="scope.row.onForever ? 'primary' : 'info'">{{ scope.row.onForever ? '是' : '否' }}</el-tag>
							</template>
						</el-table-column>
            <el-table-column label="是否显示" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag :type="scope.row.onShow ? 'primary' : 'info'">{{ scope.row.onShow ? '是' : '否' }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteLevel(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getLevelList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllLevel="deleteAllLevel" />
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
