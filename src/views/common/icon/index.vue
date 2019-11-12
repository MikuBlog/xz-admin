<template>
  <div class="icon-box">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span style="font-size: 1rem">图标库</span>
          </div>
          <div class="icon-list">
            <div class="box" v-for="items in iconList" :key="items.key" @click="copy(items.tag)">
              <el-tooltip class="item" effect="dark" :content="items.tag" placement="top">
                <div class="tip-box">
                  <svg-icon :icon-class="items.name" />
                  <div class="icon-name">{{items.name}}</div>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Initial from './mixins/initial'
import Operation from './mixins/operation'
import Property from './mixins/property'
export default {
  mixins: [ Initial, Operation, Property ]
};
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
