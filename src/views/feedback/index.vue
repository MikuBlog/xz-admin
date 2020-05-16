<template>
  <div class="article-list">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div class="search">
            <el-input
              v-model="nickname"
              placeholder="搜索用户昵称"
              class="search-input margin-box"
              @keyup.native.enter="search"
            ></el-input>
            <el-select v-model="searchStatus" placeholder="反馈状态" class="select-input margin-box" style="width: 7rem" @change="search" clearable>
              <el-option
                v-for="item in options_1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select @change="search" style="width: 7rem" v-model="searchFeedType" placeholder="反馈类型" class="select-input margin-box" clearable>
              <el-option
                v-for="item in options_2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
            <el-button
              type="success"
              icon="el-icon-refresh"
              class="margin-box"
              @click="refresh"
              circle
              title="重置"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="margin-box"
              @click="deleteAllComment"
              :disabled="!selectList.length"
              title="批量删除订单"
              circle
            ></el-button>
          </div>
          <el-table
            ref="table"
            :data="commentList"
						:max-height="$store.state.tableHeight.tableHeight"
            style="width: 100%"
            highlight-current-row
            stripe
          >
            <el-table-column type="selection" width="55" reserve-selection />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="反馈内容" class="expand-line">
                    <span>{{ props.row.content || "无" }}</span>
                  </el-form-item>
                  <el-form-item label="回复内容" class="expand-line">
                    <span>{{ props.row.adminReply || "无" }}</span>
                  </el-form-item>
                  <el-form-item label="订单图片" class="expand-line">
                    <img width="30" height="30" style="margin-right: 5px; vertical-align: top" :src="item" v-for="(item, ind) in props.row.imageList" @click="(isShow = true), (url = item)" :key="ind">
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称" :show-overflow-tooltip="true" />
            <el-table-column prop="phone" label="手机号" :show-overflow-tooltip="true" />
            <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true" />
            <el-table-column prop="status" label="反馈状态" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status
                ? 'success'
                : 'info'">{{ scope.row.status
                ? '已回复'
                : '未回复' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="feedType" label="反馈类型" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.feedType === '遇到问题'
                ? 'danger'
                : 'success'">{{ scope.row.feedType }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="反馈时间" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="180">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  icon="el-icon-chat-line-round"
                  @click="replyComment(scope.row)"
                ></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteComment(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            ref="pagination"
            :get-data="getCommentList"
            :now-page.sync="nowPage"
            :now-size.sync="nowSize"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <operation-box :options="buttonOptions" @deleteAllComment="deleteAllComment" />
    <ImagePreview :show-modal.sync="isShow" :url="url" />
    <eForm ref="form" />
  </div>
</template>

<script>
import Operation from "./js/operation";
import Property from "./js/property";
import eForm from "./components/form";
export default {
  mixins: [Operation, Property],
  components: { eForm }
};
</script>
