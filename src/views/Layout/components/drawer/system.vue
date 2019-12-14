<template>
  <div>
    <h2 style="margin: 2rem 0">菜单颜色风格</h2>
    <div
      class="radio-box"
      style="text-align: left"
      v-show="defaultConfig.diy.menu"
      @change="$nextTick(() => { $parent.initialStyle() })"
    >
      <el-radio-group v-model="$store.state.setting.menuStyle">
        <el-radio label="light">白昼</el-radio>
        <el-radio label="dark">夜晚</el-radio>
      </el-radio-group>
    </div>
    <h2 style="margin: 2rem 0">菜单布局风格</h2>
    <div class="radio-box" style="text-align: left" v-show="defaultConfig.diy.menu">
      <el-radio-group
        v-model="$store.state.setting.isVerticleMenu"
        @change="$nextTick(() => { $parent.initialStyle() })"
      >
        <el-radio :label="true" :disabled="!defaultConfig.diy.menu">垂直</el-radio>
        <el-radio :label="false" :disabled="!defaultConfig.diy.menu">水平</el-radio>
      </el-radio-group>
    </div>
    <h2 style="margin: 2rem 0">系统主题设置</h2>
    <div class="switch-box">
      <div class="box" style="top: 4px" v-show="defaultConfig.diy.themeColor">
        <span class="tips" style="top: 0">更换主题</span>
        <Theme />
      </div>
      <div class="radio-box" v-show="defaultConfig.diy.themeStyle">
        <el-radio-group v-model="$store.state.setting.themeStyle" @change="changeThemeStyle">
          <el-radio label="lightMode">白昼</el-radio>
          <el-radio label="darkMode">夜间</el-radio>
          <el-radio label="weaknessMode">色弱</el-radio>
          <el-radio label="hueRotateMode">反转</el-radio>
        </el-radio-group>
      </div>
      <div
        class="block"
        style="font-size: 1rem; margin-top: 1rem; padding: 0 8px; text-align: left"
        v-show="defaultConfig.diy.brightness"
      >
        <span class="demonstration">系统亮度</span>
        <el-slider
          v-model="$store.state.setting.brightness"
          :format-tooltip="formatTooltip"
          @change="changeBrightness"
        ></el-slider>
      </div>
    </div>
    <h2 style="margin: 2rem 0">系统布局设置</h2>
    <div class="switch-box">
      <div class="box" v-show="defaultConfig.diy.logo">
        <span class="tips">显示Logo</span>
        <el-switch v-model="$store.state.setting.showLogo"></el-switch>
      </div>
      <div class="box" v-show="defaultConfig.diy.tagViews">
        <span class="tips">显示标签页</span>
        <el-switch v-model="$store.state.setting.showTags"></el-switch>
      </div>
      <div class="box" v-show="defaultConfig.diy.breadcrumb">
        <span class="tips">显示面包屑</span>
        <el-switch v-model="$store.state.setting.showBreadcrumb"></el-switch>
      </div>
      <div class="box" v-show="defaultConfig.diy.footer">
        <span class="tips">显示页脚</span>
        <el-switch v-model="$store.state.setting.showFooter"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      app: document.querySelector("#app")
    };
  },
  computed: {
    ...mapState({
      settings: state => state.setting
    })
  },
  mounted() {
    this.changeBrightness();
    this.changeThemeStyle();
  },
  methods: {
    // 更换主题风格
    changeThemeStyle() {
      switch (this.settings.themeStyle) {
        case "lightMode":
          this.$darkMode(false);
          this.$weaknessMode(false);
          this.$hueRotate(false);
          break;
        case "darkMode":
          this.$darkMode(true);
          this.$weaknessMode(false);
          this.$hueRotate(false);
          break;
        case "weaknessMode":
          this.$darkMode(false);
          this.$weaknessMode(true);
          this.$hueRotate(false);
          break;
        case "hueRotateMode":
          this.$darkMode(false);
          this.$weaknessMode(false);
          this.$hueRotate(true);
          break;
      }
    },
    // 调整亮度
    changeBrightness() {
      if (this.settings.brightness < 10) {
        this.settings.brightness = 10;
      }
      if (!this.settings.dark) {
        this.$setStyle(
          this.app,
          "filter",
          `brightness(${this.settings.brightness / 100} ${
            this.settings.dark ? "hue-rotate(180deg) invert(1)" : ""
          })`
        );
      }
    },
    // 值格式化
    formatTooltip(val) {
      return val / 100;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  margin: 1rem 0.5rem;
}
.tips {
  position: absolute;
  top: -3px;
  left: 0;
  font-size: 1rem;
}
.button {
  position: relative;
  margin: 0.5rem 0;
}
.switch-box {
  position: relative;
  margin: 1rem 0;
  text-align: right;
}
.radio-box {
  position: relative;
  margin: 1.3rem 0;
  text-align: center;
}
</style>