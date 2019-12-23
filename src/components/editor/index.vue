<template>
  <!--富文本编辑器-->
  <vue-ueditor-wrap v-model="data" :config="myConfig"></vue-ueditor-wrap>
</template>

<script>
/**
 * @author xuanzai
 * @description 二次封装百度富文本编辑器
 */
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  name: "Editor",
  components: { VueUeditorWrap },
  model: {
    prop: "msg",
    event: "input"
  },
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: "",
      myConfig: {
        // 编辑器是否自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 500,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "https://aboot.missiono.cn/ueditor.do",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/ueditor/"
      }
    };
  },
  watch: {
    // 当父组件异步传入参数的时候，改变富文本的值
    msg: {
      handler(val) {
        this.data = val
      },
      immediate: true
    },
    // 当富文本的值改变的时候，更新父组件的值
    data(val) {
      this.$emit("input", val);
    }
  }
};
</script>
