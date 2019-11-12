<template>
  <el-dialog title="详情信息" :visible.sync="dialogVisible" :fullscreen="true">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <h3>操作前的值</h3>
        <pre class="pre">{{authorityOldDetail}}</pre>
      </el-col>
      <el-col :sm="24" :md="12">
        <h3>操作后的值</h3>
        <pre class="pre">{{authorityNewDetail}}</pre>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      authorityOldDetail: "",
      authorityNewDetail: ""
    };
  }
};
</script>

<style lang="scss" scoped>
h3 {
  line-height: 3rem;
}
.pre {
  white-space: pre-wrap;
}
</style>