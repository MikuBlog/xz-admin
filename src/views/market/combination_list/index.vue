<template>
	<div class="article-list">
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<div class="search">
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
						<!-- <el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllCombination" :disabled="!selectList.length" title="批量删除拼团信息" circle></el-button> -->
					</div>
					<el-table ref="table" :max-height="$store.state.tableHeight.tableHeight" :data="list" style="width: 100%" @selection-change="handleSelectionChange" :row-key="getRowKey" highlight-current-row stripe>
						<!-- <el-table-column type="selection" width="55" reserve-selection /> -->
            <!-- <el-table-column ref="table" :show-overflow-tooltip="true" prop="url" label="产品封面" align="center">
							<template slot-scope="scope">
								<img :src="scope.row.imageUrl || 'https://myinterface.xuanzai.top/getPicture?type=error'" alt="点击打开" class="el-avatar xz-image" @click="(isShow = true), (url = scope.row.imageUrl)" />
							</template>
						</el-table-column> -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item class="expand-line" v-for="(item, ind) in props.row.pinkUsers" :key="ind">
                    <div class="flex-box">
                      <el-tag style="margin: .4rem .5rem" :type="ind === 0
                        ? 'warning'
                        : 'success'">{{ ind === 0
                        ? '团长'
                        : '团员' }}</el-tag>
                      <el-avatar :size="40" :src="convertHttp(item.avatar)"></el-avatar>
                      <div class="profix-box">
                        <span class="name">{{ item.nickname }}</span>
                      </div>
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="订单号" :show-overflow-tooltip="true" />
            <el-table-column prop="combinationName" label="拼团产品" :show-overflow-tooltip="true" />
            <el-table-column prop="startTime" label="开团时间" :show-overflow-tooltip="true" />
            <el-table-column prop="pinkPrice" label="拼团价(元)" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="totalCount" label="拼团人数" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="peopleCount" label="参与人数" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="stopTime" label="结束时间" :show-overflow-tooltip="true" />
            <el-table-column prop="stopTime" label="状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1
                ? 'primary'
                : scope.row.status === 2
                ? 'success'
                : 'info'">{{ scope.row.status === 1
                ? '进行中'
                : scope.row.status === 2
                ? '已完成'
                : '未完成' }}</el-tag>
              </template>
            </el-table-column>
						<!-- <el-table-column label="创建日期" width="180">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
							</template>
						</el-table-column> -->
						<!-- <el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="$router.push({
                  path: `/home/edit_combination?id=${scope.row.id}`
                })"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteArticle(scope.row)"></el-button>
							</template>
						</el-table-column> -->
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

<style lang="scss" scoped src="./scss/index.scss"></style>