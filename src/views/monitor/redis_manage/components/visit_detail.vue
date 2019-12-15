<template>
  <el-dialog title="详情信息" :visible.sync="dialogVisible" width="30%" append-to-body fullscreen>
    <span>{{redisDetail}}</span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      redisDetail: "",
      dialogVisible: false
    };
  }
};
</script>