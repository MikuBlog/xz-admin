<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span style="font-size: 1rem">轻量富文本编辑器</span>
          </div>
          <vue-editor class="editor" v-model="content"></vue-editor>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.editor {
  /deep/ {
    .ql-editor {
      position: relative;
      min-height: 500px;
    }
  }
}
</style>