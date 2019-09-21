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
              <el-avatar :size="120" :src="user.avatar" @click.native="uploadAvatar">
                <img src="https://myinterface.xuanzai.top/getPicture?type=error" />
              </el-avatar>
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
            <i class="el-icon-lock"></i>设置：
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
          <el-table :data="operationLogList" :highlight-current-row="true" style="width: 100%">
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
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 25, 50, 100]"
              :page-size.sync="nowSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalElements"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <editPassword ref="pswForm" />
    <editEmail ref="emailForm" @updateUserInfo="updateUserInfo" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import editPassword from "./components/edit_password";
import editEmail from "./components/edit_email";
export default {
  components: { editPassword, editEmail },
  data() {
    return {
      activeName: "first",
      searchVal: "",
      // 当前页数
      nowPage: 1,
      // 当前页条数
      nowSize: 10,
      // 总条数
      totalElements: 0,
      operationLogList: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created() {
    // 初始化页面数据
    this.getOpertionLogList();
  },
  methods: {
    // 更新用户数据
    updateUserInfo() {
      this.$emit("updateUserInfo");
    },
    // 点击搜索
    search() {
      this.nowPage = 1;
      this.getOpertionLogList();
    },
    // 回车搜索
    searchEnter(e) {
      this.nowPage = 1;
      e.keyCode === 13 && this.getOpertionLogList();
    },
    // 修改密码
    showEditPassword() {
      this.$refs.pswForm.dialog = true;
      this.$refs.pswForm.resetForm();
    },
    // 修改邮箱
    showEditEmail() {
      this.$refs.emailForm.dialog = true;
      this.$refs.emailForm.resetForm();
    },
    // 上传头像
    uploadAvatar() {
      this.$getImgFile(2).then(result => {
        this.$http_file({
          url: "/api/user/updateAvatar",
          method: "post",
          data: {
            file: result.raw
          }
        }).then(result => {
          this.updateUserInfo();
          this.$successMsg("更换头像成功，正在缓慢加载中~");
        });
      });
    },
    // 条数变化
    handleSizeChange(size) {
      this.nowSize = size;
      this.getOpertionLogList();
    },
    // 页数变化
    handleCurrentChange(page) {
      this.nowPage = page;
      this.getOpertionLogList();
    },
    // 分页处理
    initialPage(totalElements) {
      this.totalElements = totalElements;
    },
    // 初始化操作日志列表
    initialOpertionLogList(list) {
      this.operationLogList.splice(0);
      list.forEach(value => {
        this.operationLogList.push(value);
      });
    },
    // 获取操作日志信息
    getOpertionLogList() {
      this.$http_normal({
        url: `/log/page/user?page=${this.nowPage - 1}&size=${
          this.nowSize
        }&sort=createTime,desc${
          this.searchVal ? `&description=${this.searchVal}` : ""
        }`,
        method: "get"
      }).then(result => {
        const data = result.data;
        this.initialPage(data.totalElements);
        this.initialOpertionLogList(data.content);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  font-size: 1rem;
  color: #2f3032;
}
.avatar-box {
  position: relative;
  text-align: center;
}
.avatar {
  position: relative;
  margin: auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
}
.image-box {
  position: relative;
}
.image {
  position: relative;
  width: 100%;
  height: 100%;
}
.role {
  position: relative;
  font-size: 1.1rem;
  font-weight: bold;
}
.name {
  font-size: 1rem;
  color: #7d7d7d;
}
.title {
  position: relative;
  margin: 2rem 0 1rem 0;
}
.word {
  position: relative;
  padding-left: 0.3rem;
}
.content {
  position: relative;
  font-size: 0.9rem;
}
.timeline-title {
  color: #7d7d7d;
}
.timeline-content {
  font-size: 0.8rem;
}
.el-button--text {
  font-size: 0.8rem;
  padding: 0;
}
</style>