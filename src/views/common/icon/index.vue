<template>
  <div class="icon-box">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span style="font-size: 1rem">图标库</span>
            <i class="el-icon-question" style="float: right; font-size: 1.3rem; cursor: pointer" @click="$refs.Help.dialogVisible = true"/>
          </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="Icons" name="first">
              <div class="icon-list">
                <div
                  class="box"
                  v-for="items in iconList"
                  :key="items.key"
                  @dblclick="copy(items.tag)"
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
                  @dblclick="copy(`<i class='${items}' />`)"
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
            <el-tab-pane label="Font Awesome Icons" name="third">
              <div class="icon-list">
                <div
                  class="box"
                  v-for="items in fontAwesomeIcon"
                  :key="items.key"
                  @dblclick="copy(`<i class='fa fa-${items}' />`)"
                >
                  <el-tooltip class="item" effect="dark" :content="`<i class='fa fa-${items}' />`" placement="top">
                    <div class="tip-box">
                      <i :class="`fa fa-${items}`" />
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
    <Help ref="Help" />
  </div>
</template>
<script>
import Data from "./mixins/data";
import Initial from "./mixins/initial";
import Operation from "./mixins/operation";
import Property from "./mixins/property";
import Help from './components/help'
export default {
  mixins: [ Data, Initial, Operation, Property ],
  components: { Help }
};
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
