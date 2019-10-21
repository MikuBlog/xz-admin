<template>
  <Drawer v-model="isSetting" width="350px" title="系统设置" class="drawer-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="布局" name="layout"></el-tab-pane>
      <el-tab-pane label="菜单" name="menu"></el-tab-pane>
      <el-tab-pane label="Logo" name="logo"></el-tab-pane>
    </el-tabs>
    <el-scrollbar style="height: 80%">
      <div v-show="activeName === 'menu'">
        <h2 style="margin: 2rem 0">菜单颜色风格</h2>
        <div class="radio-box" @change="$nextTick(() => { $parent.initialStyle() })">
          <el-radio-group v-model="$store.state.setting.menuStyle">
            <el-radio label="light">白昼</el-radio>
            <el-radio label="dark">夜晚</el-radio>
          </el-radio-group>
        </div>
        <h2 style="margin: 2rem 0">菜单布局风格</h2>
        <div class="radio-box">
          <el-radio-group v-model="$store.state.setting.isVerticleMenu">
            <el-radio :label="true">垂直</el-radio>
            <el-radio :label="false">水平</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-show="activeName === 'layout'">
        <h2 style="margin: 2rem 0">系统布局设置</h2>
        <div class="switch-box">
          <div class="box">
            <span class="tips">显示Logo</span>
            <el-switch v-model="$store.state.setting.showLogo"></el-switch>
          </div>
          <div class="box">
            <span class="tips">显示标签页</span>
            <el-switch v-model="$store.state.setting.showTags"></el-switch>
          </div>
          <div class="box">
            <span class="tips">显示面包屑</span>
            <el-switch v-model="$store.state.setting.showBreadcrumb"></el-switch>
          </div>
          <!-- <div class="box">
            <span class="tips">是否为垂直菜单</span>
            <el-switch
              v-model="$store.state.setting.isVerticleMenu"
              @change="$nextTick(() => { $parent.initialStyle() })"
            ></el-switch>
          </div> -->
        </div>
      </div>
      <div v-show="activeName === 'logo'">
        <h2 style="margin: 2rem 0">系统Logo设置</h2>
        <el-image style="width: 100%; height: 159px" :src="logo" fit="scale-down" ref="image"></el-image>
        <div class="button" v-permission="['ADMIN']">
          <el-button type="primary" style="width: 100%" @click="selectLogo">选择Logo</el-button>
        </div>
        <div class="button" v-permission="['ADMIN']">
          <el-button type="warning" style="width: 100%" @click="uploadLogo">上传Logo</el-button>
        </div>
      </div>
      <div class="button button-bottom">
        <el-button type="success" style="width: 100%" @click="saveSetting">保存设置</el-button>
      </div>
    </el-scrollbar>
  </Drawer>
</template>

<script>
import { mapState } from 'vuex'
import convertHttp from '@/utils/convertHttp'
export default {
  data() {
    return {
      logo: "",
      isSetting: false,
      activeName: "layout"
    };
  },
  computed: {
    ...mapState({
      settings: state => state.setting
    })
  },
  methods: {
    // 选择Logo
    selectLogo() { 
      this.$getImgFile()
        .then(({ raw, url }) => {
          this.logo = url;
          this.logoBlob = raw;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    uploadLogo() {
      const regexp = new RegExp(/^http/g)
      if (!this.logo || regexp.test(this.logo)) {
        this.$warnMsg("请选择Logo");
      } else {
        this.$http_file({
          url: "/api/showConfig/uploadlogo",
          method: "post",
          data: {
            file: this.logoBlob
          }
        }).then(result => {
          this.$parent.logoUrl = convertHttp(result.data.value)
          this.$successMsg("上传成功");
        });
      }
    },
    // 保存设置
    saveSetting() {
      this.$setMemoryPmt("setting", this.settings);
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
.box {
  position: relative;
  margin: 1rem .5rem;
}
.tips {
  position: absolute;
  top: -3px;
  left: 0;
  font-size: 1rem;
}
.button {
  position: relative;
  margin: .5rem 0;
}
.button-bottom {
  position: relative;
  margin-top: 3rem;
}
.switch-box {
  position: relative;
  margin: 1rem 0;
  text-align: right;
}
</style>