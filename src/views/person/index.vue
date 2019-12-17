<template>
  <div class="person">
    <el-row :gutter="20">
      <el-col :sm="24" :md="6">
        <el-card class="box-card">
          <div slot="header" class="header">
            <span>关于我</span>
          </div>
          <div class="avatar-box">
            <div class="avatar">
              <el-button 
              icon="el-icon-upload" 
              class="upload-button"
              circle
              @click="$refs.avatarForm.dialogVisible = true"></el-button>
              <el-avatar
                :size="120"
                :src="user.avatar"
              >
                <img src="https://myinterface.xuanzai.top/getPicture?type=error" />
              </el-avatar>
              <div 
              class="hover-plus"
              @click="$refs.avatarForm.dialogVisible = true">
                <svg-icon 
                icon-class="add" 
                class="add-avatar"/>
              </div>
            </div>
            <div class="avatar-detail">
              <div class="role">{{user.username}}</div>
              <div class="name">{{user.email}}</div>
            </div>
          </div>
          <div class="title">
            <i class="el-icon-reading"></i>
            <span class="word">个人信息</span>
            <div class="border"></div>
          </div>
          <div style="margin: .5rem 0; font-size: .8rem;">
            <i class="el-icon-s-custom"></i>
            部门：{{user.dept}}
          </div>
          <div style="margin: .5rem 0; font-size: .8rem;">
            <i class="el-icon-s-check"></i>
            岗位：{{user.job}}
          </div>
          <div style="margin: .5rem 0; font-size: .8rem;">
            <i class="el-icon-phone"></i>
            电话：{{user.phone}}
          </div>
          <div style="font-size: .8rem;">
            <i class="el-icon-lock"></i>
            设置：
            <el-button type="text" @click="showEditPassword">修改密码</el-button>
            <el-button type="text" @click="showEditEmail">修改邮箱</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :md="18">
        <el-card class="box-card card-gutter-sm">
          <div slot="header" class="clearfix">
            <span class="header">操作日志</span>
          </div>
          <div class="search">
            <el-input
              v-model="searchVal"
              placeholder="搜索行为名称"
              class="search-input margin-box"
              @keyup.native="searchEnter"
            ></el-input>
            <el-button icon="el-icon-search" class="margin-box" @click="search" circle></el-button>
          </div>
          <el-table :data="operationLogList" :highlight-current-row="true" style="width: 100%" :stripe="true">
            <el-table-column label="行为" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="IP" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.requestIp }}</div>
              </template>
            </el-table-column>
            <el-table-column label="IP来源" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference">{{ scope.row.address }}</div>
              </template>
            </el-table-column>
            <el-table-column label="请求耗时" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag>{{ scope.row.time }}ms</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="创建日期" width="180">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">{{ scope.row.createTime }}</div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :get-data="getOpertionLogList"
            :total="totalElements"
          />
        </el-card>
      </el-col>
    </el-row>
    <editPassword ref="pswForm" />
    <editEmail ref="emailForm" @updateUserInfo="updateUserInfo" />
    <editAvatar ref="avatarForm" @updateUserInfo="updateUserInfo" />
  </div>
</template>

<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
import editPassword from "./components/edit_password";
import editEmail from "./components/edit_email";
import editAvatar from "./components/edit_avatar";
export default {
  mixins: [ Initial, Operation, Property ],
  components: { editPassword, editEmail, editAvatar }
};
</script>

<style lang="scss" scoped src="./style/index.scss"></style>