import { mapState, mapMutations } from 'vuex'
import settingDrawer from './components/setting_drawer'
import convertHttp from '@/utils/convertHttp'
export default {
  components: { settingDrawer },
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      isSmall: false,
      isMenuCollapse: false,
      isSetting: false,
      isShowBackTop: false,
      activeName: 'layout',
      logoBlob: "",
      user: {},
      squareUrl: "",
      logoUrl: "",
      interval: "",
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
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo()
    // 获取Logo信息
    this.getLogo()
  },
  mounted() {
    /**
     * @description 初始化页面样式
     * 由于菜单生成有滞后性，所以使用循环定时器进行页面初始化，如果菜单生成完毕，则初始化页面并停止循环定时器
     */
    this.interval = setInterval(() => {
      if(document.querySelectorAll('.el-menu-item-group').length > 0) {
        this.initialStyle()
        clearInterval(this.interval)
      }
    })
    this.initialListener()
    // 获取视窗大小
    this.getWindowWidth()
  },
  methods: {
    ...mapMutations([
      "setUserInfo",
      "removeAllTags"
    ]),
    // 获取用户信息
    getUserInfo() {
      this.$http_json({
        url: "/auth/info",
        method: "get"
      }).then(result => {
        result.data.avatar = convertHttp(result.data.avatar)
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
        menuScrollBar = document.querySelector('.menu-scrollbar'),
        menuProp = document.querySelectorAll('.el-menu--popup'),
        menuItemGroup = document.querySelectorAll('.el-menu-item-group'),
        drawerContent = document.querySelector('.ivu-drawer-content'),
        horizontalScrollbar = document.querySelector('.menu-horizontal-scrollbar>.el-scrollbar__wrap')
      this.$setStyle(
        menuScrollBar,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
      this.$setStyle(
        horizontalScrollbar,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
      this.$setStyle(
        menuScrollBar,
        'border-right',
        '1px solid #dcdfe6'
      )
      this.$setStyle(
        drawerContent,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
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