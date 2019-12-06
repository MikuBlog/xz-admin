export default {
  created() {
    document.title = "登录";
    this.isAutoLogin();
    this.getCode()
  },
  mounted() {
    this.initialStyle();
    this.getBoxVal();
    this.useBg();
    setTimeout(() => {
      // 插入元素
      this.insertEle();
    });
  },
  methods: {
    // 值格式化
    formatTooltip(val) {
      return val / 100;
    },
    // 初始化样式
    initialStyle() {
      const ele = document.querySelector(".ivu-drawer-body");
      this.$setStyle(ele, "overflow-x", "hidden");
      this.opacity = +this.$getMemoryPmt("opacity") || this.opacity;
      this.blur = +this.$getMemoryPmt("blur") || this.blur;
      this.mask = +this.$getMemoryPmt("mask") || this.mask;
      this.height = +this.$getMemoryPmt("height") || (this.defaultConfig.otherLoginMethods ? 66 : this.height);
      this.width = +this.$getMemoryPmt("width") || this.width;
      this.fontSize = +this.$getMemoryPmt("fontSize") || this.fontSize;
      this.isItalic = this.$getMemoryPmt("isItalic") !== "" ? Boolean(this.$getMemoryPmt("isItalic")) : this.isItalic;
      this.iconSize = +this.$getMemoryPmt("iconSize") || this.iconSize;
      this.size = this.$getMemoryPmt("size") || this.size;
      this.repeat = this.$getMemoryPmt("repeat") || this.repeat;
      this.boxColor = this.$getMemoryPmt("boxColor") || this.boxColor;
      this.fontColor = this.$getMemoryPmt("fontColor") || this.fontColor;
      this.ruleForm.checked = this.$getMemoryPmt("isAutoLogin") || this.ruleForm.checked;
    },
    getCode() {
      this.$http({
        url: `${baseUrl}/auth/vCode`,
        method: "get"
      }).then(result => {
        const data = JSON.parse(result.request.response)
        this.codeUrl = `data:image/jpeg;base64,${data.img}`
      })
    }
  }
}