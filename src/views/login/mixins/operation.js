import { encrypt } from '@/utils/encrypt'
export default {
  methods: {
    // 判断是否自动登录
    isAutoLogin() {
      this.$getMemoryPmt("isAutoLogin") &&
        this.$getMemoryPmt("token") &&
        this.$router.push({ path: "/home/welcome" });
    },
    autoLogin(val) {
      this.$setMemoryPmt("isAutoLogin", val);
    },
    // 关闭抽屉样式恢复
    closeDrawer() {
      const
        loginBox = this.$refs.loginBox,
        header = this.$refs.header,
        svg = document.querySelectorAll("svg"),
        checkBox = document.querySelector(".el-checkbox"),
        tip = document.querySelector(".tip");
      this.$setStyle(
        loginBox,
        "height",
        `${(this.height = this.$getMemoryPmt("height") || (this.defaultConfig.otherLoginMethods ? 66 : 41)) / 2}rem`
      );
      this.$setStyle(
        loginBox,
        "width",
        `${(this.width = this.$getMemoryPmt("width") || 45) / 2}rem`
      );
      this.$setStyle(
        loginBox,
        "background",
        `${(this.boxColor =
          this.$getMemoryPmt("boxColor") || "rgba(0, 0, 0, .35)")}`
      );
      this.$setStyle(
        header,
        "font-size",
        `${(this.fontSize = this.$getMemoryPmt("fontSize") || 30) / 20}rem`
      );
      this.$setStyle(
        header,
        "color",
        `${(this.fontColor = this.$getMemoryPmt("fontColor") || "#fefefe")}`
      );
      this.$setStyle(
        checkBox,
        "color",
        `${this.$getMemoryPmt("fontColor") || "#fefefe"}`
      );
      this.$setStyle(
        tip,
        "color",
        `${this.$getMemoryPmt("fontColor") || "#fefefe"}`
      );
      svg.forEach(value => {
        this.$setStyle(
          value,
          "width",
          `${(this.iconSize = this.$getMemoryPmt("iconSize") || 30) / 10}rem`
        );
        this.$setStyle(
          value,
          "height",
          `${(this.$getMemoryPmt("iconSize") || 30) / 10}rem`
        );
      });
    },
    // 登录框样式预览
    getBoxVal() {
      const loginBox = this.$refs.loginBox,
        header = this.$refs.header,
        svg = document.querySelectorAll("svg"),
        checkBox = document.querySelector(".el-checkbox"),
        tip = document.querySelector(".tip");
      this.$setStyle(loginBox, "height", `${this.height / 2}rem`);
      this.$setStyle(loginBox, "width", `${this.width / 2}rem`);
      this.$setStyle(loginBox, "background", `${this.boxColor}`);
      this.$setStyle(header, "font-size", `${this.fontSize / 20}rem`);
      this.$setStyle(header, "color", `${this.fontColor}`);
      this.$setStyle(
        header,
        "font-style",
        `${this.isItalic ? "italic" : "normal"}`
      );
      this.$setStyle(checkBox, "color", `${this.fontColor}`);
      this.$setStyle(tip, "color", `${this.fontColor}`);
      svg.forEach(value => {
        this.$setStyle(value, "width", `${this.iconSize / 10}rem`);
        this.$setStyle(value, "height", `${this.iconSize / 10}rem`);
      });
    },
    // 图片预览
    getVal() {
      const child = document.querySelector(".login-background .el-image__inner"),
        mask = document.querySelector(".login-background .small-mask");
      this.backgroundUrl &&
        (this.$setStyle(child, "opacity", `${this.opacity / 100}`),
          this.$setStyle(child, "filter", `blur(${this.blur}px)`));
      mask.style.cssText = `
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, ${this.mask / 100});
            `;
    },
    // 选择背景图
    selectPic() {
      this.$getImgFile(3)
        .then(({ raw, url }) => {
          this.backgroundUrl = url;
        })
        .catch(e => {
          this.$warnMsg(e);
        });
    },
    // 应用图片
    useBg() {
      const ele = this.$refs.background,
        mask = this.$refs.mask;
      this.backgroundUrl &&
        (this.$setStyle(ele, "background-image", `url(${this.backgroundUrl})`),
          this.$setStyle(ele, "opacity", `${this.opacity / 100}`),
          this.$setStyle(ele, "filter", `blur(${this.blur}px)`),
          this.$setStyle(
            ele,
            "background-size",
            `${this.size == "fill" ? "100% 100%" : this.size}`
          ),
          this.$setStyle(
            mask,
            "background",
            `rgba(0, 0, 0, ${this.mask / 100})`
          ));
      this.repeat
        ? this.$setStyle(ele, "background-repeat", "no-repeat")
        : this.$setStyle(ele, "background-repeat", "repeat");
      this.saveBgStyle();
    },
    // 保存背景样式
    saveBgStyle() {
      this.$setMemoryPmt("backgroundUrl", this.backgroundUrl);
      this.$setMemoryPmt("opacity", this.opacity);
      this.$setMemoryPmt("blur", this.blur);
      this.$setMemoryPmt("mask", this.mask);
      this.$setMemoryPmt("size", this.size);
      this.$setMemoryPmt("repeat", this.repeat);
      if (this.unLock) {
        this.$successMsg("应用背景成功");
      }
      this.unLock = true;
    },
    // 保存登录框样式
    saveBoxStyle() {
      this.$setMemoryPmt("height", this.height);
      this.$setMemoryPmt("width", this.width);
      this.$setMemoryPmt("fontSize", this.fontSize);
      this.$setMemoryPmt("iconSize", this.iconSize);
      this.$setMemoryPmt("boxColor", this.boxColor);
      this.$setMemoryPmt("fontColor", this.fontColor);
      this.$setMemoryPmt("isItalic", this.isItalic);
      this.$successMsg("保存成功");
    },
    // 显示对应的tab页
    getTag(tab, event) {
      this.tab = this.tab.map((val, ind) => {
        if (tab.name == ind) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    // 展开抽屉
    showSetting() {
      this.isShowDrawer = true;
    },
    // 回车登陆
    pressEnter(e) {
      e.keyCode === 13 && this.submitForm("ruleForm");
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http_json({
            url: "/auth/login",
            method: "post",
            data: {
              username: this.ruleForm.username,
              password: encrypt(this.ruleForm.password),
              vcode: this.ruleForm.vcode,
              uuid: this.ruleForm.uuid
            }
          }).then(result => {
            this.$setMemoryPmt("token", result.data.token)
            this.$setMemoryPmt('username', this.ruleForm.username)
            this.$getMemorySes("redirect")
              ? this.$router.push({ path: this.$getMemorySes("redirect") })
              : this.$router.push({ path: "/home/welcome" })
          });
          this.getCode()
        } else {
          return false;
        }
      });
    }
  }
}