<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
						<el-select
						  v-model="selectType"
						  clearable
						  placeholder="类型"
						  @change="getType"
						  class="select-input margin-box"
						>
						  <el-option
						    v-for="item in options"
						    :key="item.value"
						    :label="item.label"
						    :value="item.value"
						  ></el-option>
						</el-select>
						<!-- <el-input v-model="searchVal" placeholder="搜索关键词" class="search-input margin-box" @keyup.native="searchEnter"></el-input> -->
						<!-- <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button> -->
						<el-button type="success" icon="el-icon-refresh" class="margin-box" @click="refresh" circle title="重置"></el-button>
						<el-button type="primary" class="margin-box" icon="el-icon-plus" @click="toAddApplicationPage" title="添加应用" circle></el-button>
						<!-- <el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllApplication" :disabled="!selectList.length" title="批量删除应用" circle></el-button> -->
					</div>
					<div class="card-table">
						<el-card class="box-card" v-for="item in applicationList">
							<div class="flex-box">
								<div class="profix">
									<el-image
									  style="width: 130px; height: 130px"
									  :src="item.logo || 'https://myinterface.xuanzai.top/getPicture?type=error'"
									  fit="cover"></el-image>
									<div class="title-box">
										<div class="title">
											AppID：{{ item.appid }}
										</div>
										<div class="title">
											类型：<el-tag :type="item.type === 1 ? 'primary' : 'success'">
												{{ item.type === 1
												 ? '小程序'
												 : '公众号'}}
											</el-tag>
										</div>
										<div class="title">
											简介：{{ item.remark }}
										</div>
									</div>
								</div>
								<div class="operator">
									<el-button type="primary" icon="el-icon-edit" @click="toEditApplicationPage(item)" />
									<el-button
									  slot="reference"
									  type="danger"
									  @click="deleteApplication(item)"
									  icon="el-icon-delete"
									/>
								</div>
							</div>
						</el-card>
					</div>
					<pagination ref="pagination" :get-data="getApplicationList" :now-page.sync="nowPage" :now-size.sync="nowSize" :total="totalElements" />
				</el-card>
			</el-col>
		</el-row>
		<operation-box :options="buttonOptions" @toAddApplicationPage="toAddApplicationPage" />
	</div>
</template>

<script>
import Operation from './js/operation';
import Property from './js/property';
export default {
  mixins: [Operation, Property]
};
</script>

<style lang="scss" scoped src="./scss/index.scss"></style>