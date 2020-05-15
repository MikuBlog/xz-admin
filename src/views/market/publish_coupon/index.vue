<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索优惠券名称"
              class="search-input margin-box"
              @keyup.native.enter="search"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="success"
              icon="el-icon-refresh"
              class="margin-box"
              @click="refresh"
              circle
              title="重置"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" class="margin-box" @click="deleteAllCoupon" :disabled="!selectList.length" title="批量删除已发布优惠券" circle></el-button>
          </div>
          <el-table
            ref="table"
            :data="couponPublishList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="getRowKey"
            highlight-current-row
            stripe
          >
            <el-table-column type="selection" width="55" reserve-selection />
            <el-table-column prop="couponTitle" label="优惠券名称" :show-overflow-tooltip="true" />
            <el-table-column
              prop="startTime"
              label="优惠券开始时间"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="endTime"
              label="优惠券结束时间"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              prop="totalCount"
              label="发布张数"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              prop="remainCount"
              label="剩余张数"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              prop="couponTime"
              label="有效天数(天)"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column prop="type" label="状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 0 
              ? 'info' 
              : scope.row.status === 1
              ? 'primary'
              : 'danger'"
                >
                  {{ scope.row.status === 1
                  ? '开启'
                  : scope.row.status === 0
                  ? '关闭'
                  : '已过期' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" @click="showEditBox(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteCoupon(scope.row)"></el-button>
							</template>
						</el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getCouponPublishList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions"
    @deleteAllLevel="deleteAllCoupon" />
    <eForm ref="form" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from './components/form'
export default {
  mixins: [Operation, Property],
  components: { eForm }
};
</script>
