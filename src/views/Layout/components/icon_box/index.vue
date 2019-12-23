<template>
  <div class="icon-box">
    <el-tooltip
      class="item"
      effect="dark"
      content="搜索菜单项"
      placement="bottom"
      v-show="defaultConfig.searchMenu && !isMini"
    >
      <search class="search-menu-input" />
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="查阅文档"
      placement="bottom"
      v-show="defaultConfig.helpPage"
    >
      <i class="el-icon-question" @click="$router.push({ path: '/home/docs' })"></i>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="清除缓存"
      placement="bottom"
      v-show="defaultConfig.clearStorage"
    >
      <i class="el-icon-delete-solid" @click="clearStorage"></i>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="查看错误日志"
      placement="bottom"
      v-show="defaultConfig.errorLog"
    >
      <svg-icon
        class="bug"
        icon-class="bug"
        @click.native="$emit('showErrorLogBox')"
      />
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="dark"
      content="全屏"
      placement="bottom"
      v-show="defaultConfig.fullScreen"
    >
      <svg-icon
        class="fullscreen"
        icon-class="全屏"
        @click.native="fullScreen"
      />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullScreen: false,
      isMini: false
    };
  },
  methods: {
    // 清除缓存
    clearStorage() {
      this.$showMsgBox({
        msg: `<p>是否清除缓存?</p>
          <p>您所设置的所有系统样式及背景将被重置!</p>`,
        isHTML: true,
        iconClass: "el-icon-question"
      }).then(() => {
        this.$clearMemoryPmt();
        window.location.reload();
      });
    },
    // 设置全屏与取消全屏
    fullScreen() {
      this.isFullScreen ? this.$cancelFullScreen() : this.$setFullScreen();
      this.isFullScreen = !this.isFullScreen;
    }
  }
};
</script>

<style lang="scss" scoped>
.search-menu-input {
  position: relative;
  display: inline-block;
  top: -8px;
  left: -19px;
}
.el-icon-s-tools,
.el-icon-question,
.el-icon-delete-solid {
  position: relative;
  top: 1px;
  margin-right: 0.8rem;
  font-size: 25px;
}
.el-icon-s-tools,
.iconfullscreenexit,
.el-icon-question {
  cursor: pointer;
  transition: 0.3s;
}
.el-icon-s-tools:active {
  color: rgb(19, 180, 255);
}
.el-icon-question:active {
  color: rgb(19, 180, 255);
}
.iconfullscreenexit:active {
  color: rgb(19, 180, 255);
}
.bug {
  width: 24px!important; 
  height: 24px!important; 
  top: 2px; 
  margin-right: 0.8rem; 
  color: red
}
.fullscreen {
  width: 24px!important; 
  height: 24px!important; 
  top: 1px
}
</style>