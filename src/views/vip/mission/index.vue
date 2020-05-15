<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
            <el-select
              class="search-input margin-box"
              placeholder="筛选等级名称"
              v-model="levelId"
              @change="search"
              clearable
            >
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="searchVal" placeholder="搜索任务名称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="showAddBox" title="添加等级任务" circle></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllMission" :disabled="!selectList.length" title="批量删除等级任务" circle></el-button>
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="missionList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
						<el-table-column prop="levelName" label="等级名称" :show-overflow-tooltip="true" />
            <el-table-column prop="name" label="任务名称" :show-overflow-tooltip="true" />
            <el-table-column prop="sort" label="排序" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
								<el-tag type="primary">{{ scope.row.sort }}</el-tag>
							</template>
            </el-table-column>
            <el-table-column label="是否必须完成" align="center" show-overflow-tooltip>
							<template slot-scope="scope">
								<el-tag :type="scope.row.onMust ? 'primary' : 'info'">{{ scope.row.onMust ? '是' : '否' }}</el-tag>
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
								<el-button type="danger" icon="el-icon-delete" @click="deleteMission(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getMissionList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @showAddBox="showAddBox" @deleteAllMission="deleteAllMission" />
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
