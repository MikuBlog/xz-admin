<template>
  <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
    <div class="error-box-title" slot="title">
      <span>错误日志</span>
      <el-button @click="removeAllErrorLog" type="danger" size="mini" icon="el-icon-delete">清空</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <el-table :data="errorLogList" style="width: 100%" highlight-current-row stripe border>
          <el-table-column label="错误信息">
            <template slot-scope="scope">
              <div class="error-box">
                <span class="error-title">简述：</span>
                <el-tag type="danger">{{ scope.row.err }}</el-tag>
              </div>
              <div class="error-box">
                <span class="error-title">详情：</span>
                <el-tag type="warning">{{ scope.row.info }}</el-tag>
              </div>
              <div class="error-box">
                <span class="error-title">地址：</span>
                <el-tag type="success">{{ scope.row.url }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="错误跟踪">
            <template slot-scope="scope">
              <span>{{ scope.row.err.stack }}</span>
            </template>
          </el-table-column>
          <div class="empty" slot="empty">
            <svg-icon
              class="not-interesting"
              icon-class="不感兴趣_44"
            />
            <div class="empty-content">
              May heaven never have bug
            </div>
          </div>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "error-log",
  data() {
    return {
      dialogVisible: false
    };
  },
  computed: {
    ...mapState({
      errorLogList: state => state.error.errorLogList
    })
  },
  methods: {
    ...mapMutations({
      removeAllErrorLog: 'REMOVE_ALL_ERROR_LOG'
    })
  }
};
</script>

<style lang="scss" scoped>
.error-title {
  font-weight: bold;
  padding-right: 20px;
}
.error-box {
  position: relative;
  margin: 1rem 0;
}
.error-box-title {
  span {
    position: relative;
    padding-right: 1rem;
    font-size: 1.1rem;
  }
  .el-button {
    position: relative;
    top: -1px;
  }
}
.empty {
  position: relative;
  margin: 1rem 0;
  text-align: center;
  .not-interesting {
    position: relative;
    width: 60px;
    height: 60px;
    top: 1rem;
  }
  .empty-content {
    position: relative;
    line-height: 25px;
  }
}
</style>