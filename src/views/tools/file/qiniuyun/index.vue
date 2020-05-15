<template>
	<div class="picture-manage">
		<el-row>
			<el-col :span="24">
				<div class="search">
					<el-input v-model="searchVal" placeholder="搜索文件名称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
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
					<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="同步数据"></el-button>
					<el-button type="primary" icon="el-icon-upload" class="margin-box" @click="uploadFile" title="上传文件" circle></el-button>
					<el-button type="warning" icon="el-icon-download" class="margin-box" @click="exportFile" :disabled="!selectFileList.length" title="批量导出文件" circle></el-button>
					<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAll" :disabled="!idList.length" title="批量删除" circle></el-button>
					<el-button type="primary" icon="el-icon-setting" class="margin-box" @click="showConfigModal" title="配置七牛云" circle></el-button>
				</div>
				<el-table ref="pictureTable" :max-height="$store.state.tableHeight.tableHeight" :data="fileList" style="width: 100%;" :row-key="getRowKey" @selection-change="selectItem" highlight-current-row stripe>
					<el-table-column type="selection" width="55" reserve-selection />
					<el-table-column prop="key" label="文件名" :show-overflow-tooltip="true" />
					<el-table-column prop="suffix" label="文件类型" show-overflow-tooltip align="center">
						<template slot-scope="scope">
							<el-tag>{{ scope.row.suffix }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="size" label="文件大小" show-overflow-tooltip />
					<el-table-column prop="type" label="类别" show-overflow-tooltip align="center">
						<template slot-scope="scope">
							<el-tag type="success">{{ scope.row.type }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="operator" label="操作人" :show-overflow-tooltip="true" />
					<el-table-column label="创建日期" width="180">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right" align="center" width="300">
						<template slot-scope="scope">
							<el-button type="success" icon="el-icon-view" @click="preview(scope.row)" v-show="scope.row.type === '公开'"></el-button>
							<el-button type="primary" icon="el-icon-download" @click="downloadFile(scope.row)"></el-button>
							<el-button type="warning" icon="el-icon-share" @click="shareLink(scope.row)"></el-button>
							<el-button type="danger" icon="el-icon-delete" @click="deleteFile(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<pagination ref="pagination" :get-data="getFileList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
			</el-col>
		</el-row>
		<eForm ref="form" />
		<Config ref="config" />
		<Share ref="share" />
		<ImagePreview :show-modal.sync="isShow" :url="url" />
	</div>
</template>

<script>
import Initial from './js/initial';
import Operation from './js/operation';
import Property from './js/property';
import eForm from './components/form';
import Config from './components/config'
import Share from './components/share'
export default {
	mixins: [Initial, Operation, Property],
	components: { eForm, Config, Share }
};
</script>

<style></style>
