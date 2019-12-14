<template>
  <div>
    <h2 style="margin: 2rem 0">系统背景颜色设置</h2>
    <div class="color-box" v-show="defaultConfig.diy.backgroundColor">
      <div class="color c-fefefe" @click="setBackgroundColor('#fefefe')">
        <svg-icon class="tick" icon-class="勾" style="color: #666" v-show="settings.background.color === '#fefefe'"/>
      </div>
      <div class="color c-f5222d" @click="setBackgroundColor('#f5222d')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#f5222d'"/>
      </div>
      <div class="color c-fa541c" @click="setBackgroundColor('#fa541c')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#fa541c'"/>
      </div>
      <div class="color c-fbb937" @click="setBackgroundColor('#fbb937')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#fbb937'"/>
      </div>
      <div class="color c-13c2c2" @click="setBackgroundColor('#13c2c2')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#13c2c2'"/>
      </div>
      <div class="color c-52c41a" @click="setBackgroundColor('#52c41a')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#52c41a'"/>
      </div>
      <div class="color c-1890ff" @click="setBackgroundColor('#1890ff')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#1890ff'"/>
      </div>
      <div class="color c-2f54eb" @click="setBackgroundColor('#2f54eb')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#2f54eb'"/>
      </div>
      <div class="color c-722ed1" @click="setBackgroundColor('#722ed1')">
        <svg-icon class="tick" icon-class="勾" v-show="settings.background.color === '#722ed1'"/>
      </div>
    </div>
    <h2 style="margin: 2rem 0">系统背景图片设置</h2>
    <el-image
      style="width: 100%; height: 159px"
      :src="$store.state.setting.background.url"
      fit="cover"
      ref="image"
      class="con-background"
    ></el-image>
    <div
      class="block"
      style="margin-top: 2rem; padding: 0 10px"
      v-show="defaultConfig.diy.backgroundOpacity"
    >
      <span class="demonstration">背景透明度</span>
      <el-slider
        v-model="$store.state.setting.background.opacity"
        :format-tooltip="formatTooltip"
        @change="getVal"
      ></el-slider>
    </div>
    <div class="block" style="padding: 0 10px" v-show="defaultConfig.diy.backgroundMask">
      <span class="demonstration">背景遮罩度</span>
      <el-slider
        v-model="$store.state.setting.background.mask"
        :format-tooltip="formatTooltip"
        @change="getVal"
      ></el-slider>
    </div>
    <div class="block" style="padding: 0 10px" v-show="defaultConfig.diy.cardOpacity">
      <span class="demonstration">卡片透明度</span>
      <el-slider
        v-model="$store.state.setting.background.cardOpacity"
        :format-tooltip="formatTooltip"
        @change="setCard"
      ></el-slider>
    </div>
    <div class="button" v-show="defaultConfig.diy.selectBackrgoundButton">
      <el-button type="primary" style="width: 100%" @click="selectBackground">选择背景</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      settings: state => state.setting
    })
  },
  mounted() {
    setTimeout(() => {
      // 插入元素
      this.insertEle();
      // 初始化卡片样式
      this.setCard();
    });
    this.setBackgroundColor();
    this.setBackgroundImage();
  },
  methods: {
    // 选择背景图
    selectBackground() {
      this.$getImgFile(4)
        .then(({ url }) => {
          this.settings.background.url = url;
          this.settings.background.color = "";
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    // 插入元素
    insertEle() {
      const image =
          document.querySelector(".con-background .el-image__inner") ||
          document.querySelector(".con-background .el-image__error"),
        mask = document.createElement("div");
      mask.className = "small-mask";
      try {
        this.$insertAfter(mask, image);
        this.getVal();
      } catch (e) {}
    },
    // 图片预览
    getVal() {
      const child = document.querySelector(".con-background .el-image__inner"),
        mask = document.querySelector(".con-background .small-mask");
      this.settings.background.url &&
        this.$setStyle(
          child,
          "opacity",
          `${this.settings.background.opacity / 100}`
        );
      mask.style.cssText = `
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, ${this.settings.background.mask /
                  100});
            `;
    },
    // 修改背景颜色
    setBackgroundColor(color) {
      const ele = document.querySelector(".background");
      this.settings.background.color = color || this.settings.background.color;
      this.settings.background.color &&
        (this.$setStyle(
          ele,
          "background-image",
          `linear-gradient(to bottom, ${this.settings.background.color}, #fefefe)`
        ),
        (this.settings.background.url = ""));
    },
    // 设置背景图片
    setBackgroundImage(color) {
      const ele = document.querySelector(".background"),
        mask = document.querySelector(".mask");
      this.settings.background.url &&
        (this.$setStyle(
          ele,
          "background-image",
          `url(${this.settings.background.url})`
        ),
        this.$setStyle(
          ele,
          "opacity",
          `${this.settings.background.opacity / 100}`
        ),
        this.$setStyle(
          mask,
          "background",
          `rgba(0, 0, 0, ${this.settings.background.mask / 100})`
        ));
    },
    // 设置卡片
    setCard() {
      this.$createStyle(
        `
          .el-card {
            opacity: ${this.settings.background.cardOpacity / 100}!important;
          }
        `,
        "card-opacity"
      );
    },
    // 值格式化
    formatTooltip(val) {
      return val / 100;
    }
  }
};
</script>

<style lang="scss" scoped>
.demonstration {
  position: relative;
  font-size: 0.9rem;
}
.color-box {
  position: relative;
  margin: 1rem 0;
}
.button {
  position: relative;
  margin-top: 1rem;
}
.tick {
  left: 4px;
  top: 1px;
  color: #fefefe;
}
.color {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 20px;
  height: 20px;
  margin: 0 0.4rem;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.3s;
}
.color:hover {
  opacity: 0.7;
}
.c-fefefe {
  background: #fefefe;
  border: 1px solid #666;
}
.c-f5222d {
  background: #f5222d;
}
.c-fa541c {
  background: #fa541c;
}
.c-fbb937 {
  background: #fbb937;
}
.c-13c2c2 {
  background: #13c2c2;
}
.c-52c41a {
  background: #52c41a;
}
.c-1890ff {
  background: #1890ff;
}
.c-2f54eb {
  background: #2f54eb;
}
.c-722ed1 {
  background: #722ed1;
}
</style>