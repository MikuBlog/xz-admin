import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      isSmall: false,
      isMenuCollapse: false,
      isSetting: false,
      isShowBackTop: false,
      logo: this.defaultConfig.logoUrl,
      user: {},
      squareUrl: "",
    }
  },
  computed: {
    ...mapState({
      showLogo: state => state.setting.showLogo,
      isVerticleMenu: state => state.setting.isVerticleMenu,
      showBreadcrumb: state => state.setting.showBreadcrumb,
      showTags: state => state.setting.showTags,
      menuStyle: state => state.setting.menuStyle,
      tagsList: state => state.tags.tagsList,
      menuList: state => state.menu.menuList,
      settings: state => state.setting
    }),
    menuBackgroundColor() {
      return this.menuStyle === 'dark' 
      ? this.defaultConfig.menuStyle.dark.backgroundColor
      : this.defaultConfig.menuStyle.light.backgroundColor
    },
    menuTextColor() {
      return this.menuStyle === 'dark' 
      ? this.defaultConfig.menuStyle.dark.textColor 
      : this.defaultConfig.menuStyle.light.textColor 
    },
    activeTextColor() {
      return this.defaultConfig.menuStyle.activeTextColor
    },
    logoUrl() {
      return this.defaultConfig.logoUrl
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo()
  },
  mounted() {
    this.initialStyle()
    this.initialListener()
    // 获取视窗大小
    this.getWindowWidth()
  },
  methods: {
    ...mapMutations([
      "setUserInfo",
      "removeAllTags"
    ]),
    // 保存设置
    saveSetting() {
      this.$setMemoryPmt("setting", this.settings)
      this.$successMsg("保存设置成功")
    },
    // 获取用户信息
    getUserInfo() {
      this.$http_json({
        url: "/auth/info",
        method: "get"
      }).then(result => {
        this.setUserInfo(result.data)
        this.user = this.$store.state.user
        this.squareUrl = this.user.avatar
      })
    },
    // 返回顶部
    backTop(delay = 500) {
      $('.top').animate({ scrollTop: 0 }, delay)
    },
    // 前往项目地址
    openNewPage() {
      window.open('https://github.com/MikuBlog/xz-admin')
    },
    toHelp() {
      window.open('http://xzadmin-docs.xuanzai.top')
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
    // 选择图片
    selectPic() {
      this
        .$getImgFile()
        .then(({ raw, url }) => {
          this.logo = url
        })
        .catch(e => {
          this.$warnMsg(e)
        })
    },
    // 打开设置抽屉
    showSetting() {
      this.isSetting = true
    },
    // 移除所有标签
    removeTags() {
      this.removeAllTags()
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
    // 初始化样式
    initialStyle() {
      const
        eles = document.querySelectorAll('.el-scrollbar__wrap'),
        menuScrollBar = document.querySelector('.menu-scrollbar'),
        menuProp = document.querySelectorAll('.el-menu--popup'),
        menuItemGroup = document.querySelectorAll('.el-menu-item-group'),
        drawerContent = document.querySelector('.ivu-drawer-content'),
        regexp = new RegExp(/select/g)
      this.$setStyle(
        menuScrollBar,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
      this.$setStyle(
        drawerContent,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
      eles.forEach((val, ind) => {
        if (!regexp.test(val.className))
          this.$setStyle(val, 'overflow-x', 'hidden')
      })
      menuProp.forEach(val => {
        this.menuStyle === 'dark'
          ? this.$setStyle(
            val, 
            'background', 
            this.defaultConfig.menuStyle.dark.subMenuItemBackgroundColor)
          : this.$setStyle(
            val, 
            'background', 
            this.defaultConfig.menuStyle.light.subMenuItemBackgroundColor)
      })
      menuItemGroup.forEach(val => {
        this.menuStyle === 'dark'
          ? this.$setStyle(
            val, 
            'background', 
            this.defaultConfig.menuStyle.dark.subMenuItemBackgroundColor)
          : this.$setStyle(
            val, 
            'background', 
            this.defaultConfig.menuStyle.light.subMenuItemBackgroundColor)
      })
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
    },
    // 获取屏幕宽度
    getWindowWidth() {
      window.innerWidth < 1100
        ? (this.isSmall = true, this.isCollapse = true, this.isMenuCollapse = false)
        : this.isSmall = false
    },
    // 获取滚动高度
    getScrollTop(obj) {
      obj.scrollTop >= 100
        ? this.isShowBackTop = true
        : this.isShowBackTop = false
      this.$setMemorySes('scrollTop', obj.scrollTop)
    },
    // 事件监听
    initialListener() {
      const _this = this
      window.addEventListener('resize', () => {
        this.getWindowWidth()
      })
      document.querySelector('.top').addEventListener('scroll', function () {
        _this.getScrollTop(this)
      })
    }
  }
}