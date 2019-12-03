import Vue from 'vue'
import { mapMutations } from 'vuex'
import convertHttp from '@/utils/convertHttp'
export default {
  methods: {
    ...mapMutations([
      "SET_USER_INFO",
      "REMOVE_ALL_TAGS"
    ]),
    // 获取用户信息
    getUserInfo() {
      this.$http_json({
        url: "/auth/info",
        method: "get"
      }).then(result => {
        result.data.avatar = convertHttp(result.data.avatar)
        this.SET_USER_INFO(result.data)
        this.user = this.$store.state.user
        this.squareUrl = this.user.avatar
      })
    },
    // 设置表格大小
    setTableSize(size) {
      this.$store.state.setting.layoutSize = size
      this.$setMemoryPmt('setting', this.$store.state.setting)
      this.initialSize()
      this.refreshPage()
    },
    // 返回顶部
    backTop(delay = 500) {
      $('.top').animate({ scrollTop: 0 }, delay)
    },
    // 刷新页面
    refreshPage() {
      this.$router.replace({
        path: `/home/redirect?path=${this.$route.fullPath}`
      })
    },
    // 前往项目地址
    openNewPage() {
      window.open('https://github.com/MikuBlog/xz-admin')
    },
    // 退出登录
    logout() {
      this
        .$showMsgBox({
          msg: `是否注销当前账号?`,
          iconClass: 'el-icon-question'
        })
        .then(result => {
          // 退出前先清空用户访问记录
          this.$setMemoryPmt('token', '')
          this.$router.push({ path: '/login' })
        })
    },
    // 获取Logo
    getLogo() {
      this.$http_json({
        url: "/api/showConfig/getByName/logo",
        method: "get"
      }).then(result => {
        this.logoUrl = result.data.value
        this.$refs.setting.logo = result.data.value
      })
    },
    // 打开设置抽屉
    showSetting() {
      this.$refs.setting.isSetting = true
    },
    // 移除所有标签
    removeTags() {
      this.REMOVE_ALL_TAGS()
      this.navigateTo('/home/welcome')
    },
    // 跳转路由
    navigateTo(path) {
      this.$router.push({ path })
    },
    // 设置全屏与取消全屏
    fullScreen() {
      this.isFullScreen
        ? this.$cancelFullScreen()
        : this.$setFullScreen()
      this.isFullScreen = !this.isFullScreen
    },
    // 显示菜单
    showMenu() {
      this.isSmall
        ? this.isMenuCollapse = !this.isMenuCollapse
        : this.isCollapse = !this.isCollapse
      // 重渲染展开菜单项
      setTimeout(() => {
        this.initialStyle()
      }, 400)
    }
  }
}