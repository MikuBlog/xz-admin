<template>
  <el-dialog
  title="帮助"
  :visible.sync="dialogVisible"
  append-to-body
  width="30%"
  >
  <span>双击图标即可复制</span>
</el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>