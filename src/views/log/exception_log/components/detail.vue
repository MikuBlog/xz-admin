<template>
  <el-dialog title="详情信息" :visible.sync="dialogVisible" :fullscreen="true" append-to-body>
      <div class="code">{{ exceptionDetail }}</div>
    </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      exceptionDetail: ""
    }
  }
}
</script>

<style lang="scss" scoped>
  .code {
    white-space: pre-wrap;
  }
</style>