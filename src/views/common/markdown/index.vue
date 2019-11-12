<template>
  <div class="markdown">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span style="font-size: 1rem">markdown编辑器</span>
          </div>
          <mavon-editor
            v-model="leftMsg"
            :toolbars="toolbars"
            @change="getVal"
            @imgAdd="uploadImage"
            ref="editor"
            style="height: 550px; z-index: 1"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Operation from './mixins/operation'
import Property from './mixins/property'
export default {
  mixins: [ Operation, Property ]
};
</script>

<style>
</style>
