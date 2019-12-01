<template>
  <div class="icon-box">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span style="font-size: 1rem">图标库</span>
          </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Icons" name="first">
              <div class="icon-list">
                <div
                  class="box"
                  v-for="items in iconList"
                  :key="items.key"
                  @click="copy(items.tag, 'icons')"
                >
                  <el-tooltip class="item" effect="dark" :content="items.tag" placement="top">
                    <div class="tip-box">
                      <svg-icon :icon-class="items.name" />
                      <div class="icon-name">{{items.name}}</div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Element Icons" name="second">
              <div class="icon-list">
                <div
                  class="box"
                  v-for="items in elementIcon"
                  :key="items.key"
                  @click="copy(items, 'element')"
                >
                  <el-tooltip class="item" effect="dark" :content="`<i class='${items}' />`" placement="top">
                    <div class="tip-box">
                      <i :class="items" />
                      <div class="icon-name">{{items}}</div>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Data from "./mixins/data";
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
export default {
  mixins: [ Data, Initial, Operation, Property ]
};
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
