<template>
  <el-dialog title="详情信息" :visible.sync="dialogVisible" :fullscreen="true" append-to-body>
      <span>{{ exceptionDetail }}</span>
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