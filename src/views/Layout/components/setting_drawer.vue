<template>
  <Drawer v-model="isSetting" width="350px" title="自定义" class="drawer-setting">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="系统样式" name="DIY"></el-tab-pane>
      <el-tab-pane label="系统背景" name="Background"></el-tab-pane>
      <el-tab-pane label="系统图标" name="Logo"></el-tab-pane>
    </el-tabs>
    <el-scrollbar style="height: 100%">
      <div v-show="activeName === 'DIY'">
        <h2 style="margin: 2rem 0">菜单颜色风格</h2>
        <div
          class="radio-box"
          v-show="defaultConfig.diy.menu"
          @change="$nextTick(() => { $parent.initialStyle() })"
        >
          <el-radio-group v-model="$store.state.setting.menuStyle">
            <el-radio label="light">白昼</el-radio>
            <el-radio label="dark">夜晚</el-radio>
          </el-radio-group>
        </div>
        <h2 style="margin: 2rem 0">菜单布局风格</h2>
        <div class="radio-box" v-show="defaultConfig.diy.menu">
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
          <div class="box" v-show="defaultConfig.diy.theme">
            <span class="tips">更换主题</span>
            <Theme />
          </div>
          <div class="box" v-show="defaultConfig.diy.colorRotate">
            <span class="tips">颜色反转</span>
            <el-switch v-model="$store.state.setting.colorRotate" @change="changeColorAndBright"></el-switch>
          </div>
          <div
            class="block"
            style="font-size: 1rem; margin-top: 1.5rem; padding: 0 8px; text-align: left"
            v-show="defaultConfig.diy.brightness"
          >
            <span class="demonstration">系统亮度</span>
            <el-slider
              v-model="$store.state.setting.brightness"
              :format-tooltip="formatTooltip"
              @change="changeColorAndBright"
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
      <div v-show="activeName === 'Background'">
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
          <span class="demonstration">背景透明度：</span>
          <el-slider
            v-model="$store.state.setting.background.opacity"
            :format-tooltip="formatTooltip"
            @change="getVal"
          ></el-slider>
        </div>
        <div class="block" style="padding: 0 10px" v-show="defaultConfig.diy.cardOpacity">
          <span class="demonstration">卡片透明度：</span>
          <el-slider
            v-model="$store.state.setting.background.cardOpacity"
            :format-tooltip="formatTooltip"
            @change="setCard"
          ></el-slider>
        </div>
        <div class="block" style="padding: 0 10px" v-show="defaultConfig.diy.backgroundBlur">
          <span class="demonstration">背景模糊度：</span>
          <el-slider
            v-model="$store.state.setting.background.blur"
            :format-tooltip="formatTooltip"
            @change="getVal"
          ></el-slider>
        </div>
        <div class="block" style="padding: 0 10px" v-show="defaultConfig.diy.backgroundMask">
          <span class="demonstration">背景遮罩浓度：</span>
          <el-slider
            v-model="$store.state.setting.background.mask"
            :format-tooltip="formatTooltip"
            @change="getVal"
          ></el-slider>
        </div>
        <div class="button" v-show="defaultConfig.diy.selectBackrgoundButton">
          <el-button type="primary" style="width: 100%" @click="selectBackground">选择背景</el-button>
        </div>
      </div>
      <div v-show="activeName === 'Logo'">
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
import { mapState } from "vuex";
import convertHttp from "@/utils/convertHttp";
export default {
  data() {
    return {
      logo: "",
      isSetting: false,
      activeName: "DIY",
      app: document.querySelector('#app')
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
      this.setCard();
    });
    this.changeColorAndBright()
  },
  methods: {
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
    // 系统亮度
    changeColorAndBright() {
      if(this.settings.brightness < 10) {
        this.settings.brightness = 10
      }
      this.settings.colorRotate
      ? this.$setStyle(this.app, "filter", `hue-rotate(180deg) brightness(${ this.settings.brightness / 100 })`)
      : this.$setStyle(this.app, "filter", `brightness(${ this.settings.brightness / 100 })`)
    },
    // 图片预览
    getVal() {
      const child = document.querySelector(".con-background .el-image__inner"),
        mask = document.querySelector(".small-mask");
      this.settings.background.url &&
        (this.$setStyle(
          child,
          "opacity",
          `${this.settings.background.opacity / 100}`
        ),
        this.$setStyle(
          child,
          "filter",
          `blur(${this.settings.background.blur}px)`
        ));
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
    selectBackground() {
      this.$getImgFile(4)
        .then(({ url }) => {
          this.settings.background.url = url;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    uploadLogo() {
      const regexp = new RegExp(/^http/g);
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
          this.$parent.logoUrl = convertHttp(result.data.value);
          this.$successMsg("上传成功");
        });
      }
    },
    // 保存设置
    saveSetting() {
      this.$setMemoryPmt("setting", this.settings);
      this.$successMsg("保存设置成功");
      this.$parent.initialStyle();
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
.button-bottom {
  position: relative;
  margin: 0.5rem 0 3rem 0;
}
.switch-box {
  position: relative;
  margin: 1rem 0;
  text-align: right;
}
</style>