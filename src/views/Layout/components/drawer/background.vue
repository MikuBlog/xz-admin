<template>
  <div>
    <div v-show="defaultConfig.diy.backgroundColor">
      <h2 style="margin: 2rem 0">系统背景颜色设置</h2>
      <color-select
        :initial="setBackgroundColor"
        :nowColor="settings.background.color"
        :select-color="setBackgroundColor"
        :colorArray="colorArray"
      />
    </div>
    <div v-show="defaultConfig.diy.background">
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
        <span class="demonstration">布局透明度</span>
        <el-slider
          v-model="$store.state.setting.background.cardOpacity"
          :format-tooltip="formatTooltip"
          @change="setLayoutOpacity"
        ></el-slider>
      </div>
      <div class="button" v-show="defaultConfig.diy.selectBackrgoundButton">
        <el-button type="primary" style="width: 100%" @click="selectBackground">选择背景</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      colorArray: [
        "#eef0f3",
        "#f5222d",
        "#fa541c",
        "#fbb937",
        "#13c2c2",
        "#52c41a",
        "#1890ff",
        "#2f54eb",
        "#722ed1"
      ]
    };
  },
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
      this.setLayoutOpacity();
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
        (this.$setStyle(ele, {
          backgroundImage: `url(${this.settings.background.url})`,
          opacity: `${this.settings.background.opacity / 100}`
        }),
        this.$setStyle(
          mask,
          "background",
          `rgba(0, 0, 0, ${this.settings.background.mask / 100})`
        ));
    },
    // 设置卡片
    setLayoutOpacity() {
      this.$createStyle(
        this.defaultConfig.layoutOpacity.map(val => {
          return `${val} { opacity: ${this.settings.background.cardOpacity / 100}!important; }`
        }).join(" "),
        "layout-opacity"
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
.button {
  position: relative;
  margin-top: 1rem;
}
</style>