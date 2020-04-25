<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
            <el-input v-model="nickname" placeholder="搜索用户昵称" class="search-input margin-box" @keyup.native.enter="search"></el-input>
						<el-input v-model="productName" placeholder="搜索商品信息" class="search-input margin-box" @keyup.native.enter="search"></el-input>
            <el-input v-model="content" placeholder="搜索评论关键词" class="search-input margin-box" @keyup.native.enter="search"></el-input>
            <el-date-picker
              v-model="date"
              class="select-input margin-box"
              type="datetimerange"
              range-separator="至"
              start-placeholder="评论开始日期"
              end-placeholder="评论结束日期"
              @change="getDate"
            ></el-date-picker>
						<el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllComment" :disabled="!selectList.length" title="批量删除评论" circle></el-button>
					</div>
					<el-table ref="table" :data="commentList" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<el-table-column type="selection" width="55" reserve-selection />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="评论内容" class="expand-line">
                    <span>{{ props.row.content || "无" }}</span>
                  </el-form-item>
                  <el-form-item label="评论图片" class="expand-line">
                    <img width="30" height="30" style="margin-right: 5px; vertical-align: top" :src="item" v-for="(item, ind) in props.row.imageList" @click="(isShow = true), (url = item)" :key="ind">
                  </el-form-item>
                  <el-form-item label="回复内容" class="expand-line">
                    <span>{{ props.row.merchantReplyContent || "无" }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
						<el-table-column prop="nickname" label="用户昵称" :show-overflow-tooltip="true" />
            <el-table-column prop="productName" label="商品信息" :show-overflow-tooltip="true" />
						<el-table-column prop="type" label="商品分数" :show-overflow-tooltip="true">
							<template slot-scope="scope">
                <el-rate
                  :value ="scope.row.productScore / 10"
                  disabled
                  score-template="{value}">
                </el-rate>
              </template>
						</el-table-column>
            <el-table-column prop="type" label="服务分数" :show-overflow-tooltip="true">
							<template slot-scope="scope">
                <el-rate
                  :value ="scope.row.serviceScore / 10"
                  disabled
                  score-template="{value}">
                </el-rate>
              </template>
						</el-table-column>
						<el-table-column label="评论时间" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="success" icon="el-icon-chat-line-round" @click="replyComment(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteComment(scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<pagination ref="pagination" :get-data="getCommentList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @deleteAllComment="deleteAllComment" />
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
