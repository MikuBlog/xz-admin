export default {
  data() {
    return {
      labelPosition: "left",
      isShowDrawer: false,
      activeName: "0",
      tab: [1, 0],
      backgroundUrl: this.$getMemoryPmt("backgroundUrl") || "",
      opacity: 100,
      mask: 0,
      blur: 0,
      codeUrl: "",
      height: 66,
      width: 45,
      fontSize: 30,
      iconSize: 30,
      size: "cover",
      repeat: false,
      boxColor: "rgba(0, 0, 0, .35)",
      fontColor: "#fefefe",
      isItalic: true,
      unLock: false,
      ruleForm: {
        username: "",
        password: "",
        vcode: "",
        checked: false
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 2, max: 21, message: "账号长度在2到20个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 3, max: 21, message: "账号长度在3到21个字符", trigger: "change" }
        ],
        vcode: [
          { required: true, message: "验证码不能为空", trigger: "change" }
        ]
      }
    };
  }
}