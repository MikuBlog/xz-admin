<template>
  <Drawer v-model="isSetting" width="350px" title="自定义" class="drawer-setting">
    <el-scrollbar style="height: 100%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="系统样式" name="DIY">
          <System/>
        </el-tab-pane>
        <el-tab-pane label="系统背景" name="Background">
          <Background ref="background"/>
        </el-tab-pane>
        <el-tab-pane label="系统图标" name="Logo">
          <Logo/>
        </el-tab-pane>
      </el-tabs>
      <div class="button button-bottom">
        <el-button type="success" style="width: 100%" @click="saveSetting">保存设置</el-button>
      </div>
    </el-scrollbar>
  </Drawer>
</template>

<script>
import { mapState } from "vuex";
import convertHttp from "@/utils/convertHttp";
import System from './system'
import Background from './background'
import Logo from './logo'
export default {
  components: { System, Background, Logo },
  data() {
    return {
      isSetting: false,
      activeName: "DIY",
    };
  },
  computed: {
    ...mapState({
      settings: state => state.setting
    })
  },
  methods: {
    // 保存设置
    saveSetting() {
      this.$setMemoryPmt("setting", this.settings);
      this.$refs.background.setBackground();
      this.$successMsg("保存设置成功");
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-setting {
  /deep/ {
    .ivu-drawer-body {
      overflow: hidden;
      .el-scrollbar {
        /deep/ {
          .el-scrollbar__wrap {
            overflow-x: hidden;
          }
        }
      }
    }
  }
}
.button-bottom {
  position: relative;
  margin: 0.5rem 0 3rem 0;
}
</style>