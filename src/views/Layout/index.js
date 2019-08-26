import NavMenu from '@/components/tree_menu/SidebarItem'
import Breadcrumb from '@/components/breadcrumb'
import Tag from '@/components/tag'
import { mapState, mapMutations } from 'vuex'
export default {
  components: { NavMenu, Breadcrumb, Tag },
  data() {
    return {
      isCollapse: false,
      isFullScreen: false,
      isSmall: false,
      isMenuCollapse: false,
      isSetting: false,
      isShowBackTop: false,
      logoUrl: "",
      user: {},
      squareUrl: "",
      menuList: [{
        meta: {
          title: "首页"
        },
        iframe: false,
        icon: "主页",
        path: "/home/welcome"
      }]
    }
  },
  computed: {
    ...mapState({
      showLogo: state => state.setting.showLogo,
      showBreadcrumb: state => state.setting.showBreadcrumb,
      showTags: state => state.setting.showTags,
      tagsList: state => state.tagsList
    })
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
      "setUserInfo"
    ]),
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
    // 退出登录
    logout() {
      // 退出前先清空用户访问记录
      this.$setMemoryPmt('token', '')
      this.$router.push({ path: '/login' })
    },
    // 选择图片
    selectPic() {
      this
        .$getImgFile()
        .then(({ raw, url }) => {
          this.logoUrl = url
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
    removeAllTags() {
      this.tagsList.splice(1)
      this.navigateTo('/home/welcome')
    },
    // 点击隐藏左侧抽屉菜单
    clickMenuItem() {
      this.isMenuCollapse = false
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
        drawer = document.querySelector('.ivu-drawer-body'),
        drawerContent = document.querySelector('.ivu-drawer-content'),
        scrollContainer = document.querySelector('.el-scrollbar')
      this.$setStyle(drawer, 'padding', 0)
      this.$setStyle(drawerContent, 'background', '#2e3f54')
      this.$setStyle(scrollContainer, 'background', '#2d3e53')
      eles.forEach((value, index) => {
        this.$setStyle(value, 'overflow-x', 'hidden')
      })
      this.isMenuCollapse = false
    },
    // 显示菜单
    showMenu() {
      this.isSmall
        ? this.isMenuCollapse = !this.isMenuCollapse
        : (this.isCollapse = !this.isCollapse)
    },
    // 获取屏幕宽度
    getWindowWidth() {
      window.innerWidth < 1100
        ? (this.isSmall = true, this.isCollapse = true)
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