<template>
  <div>
    <h2 style="margin: 2rem 0">系统背景设置</h2>
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
    this.setBackground();
  },
  methods: {
    // 选择背景图
    selectBackground() {
      this.$getImgFile(4)
        .then(({ url }) => {
          this.settings.background.url = url;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    // 插入元素
    insertEle() {
      const image =
          document.querySelector(".el-image__inner") ||
          document.querySelector(".el-image__error"),
        mask = document.createElement("div");
      mask.className = "small-mask";
      try {
        this.$insertAfter(mask, image);
        this.getVal();
      } catch (e) {}
    },
    // 图片预览
    getVal() {
      const 
        child = document.querySelector(".con-background .el-image__inner"),
        mask = document.querySelector(".small-mask");
      this.settings.background.url &&
        (this.$setStyle(
          child,
          "opacity",
          `${this.settings.background.opacity / 100}`
        ))
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
    // 设置背景
    setBackground() {
      const 
        ele = document.querySelector(".background"),
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
    },
  }
};
</script>

<style lang="scss" scoped>
  .demonstration {
    position: relative;
    font-size: .9rem;
  }
</style>