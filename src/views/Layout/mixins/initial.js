import { isMobile, isSafari } from '@/utils/agent'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  created() {
    // 获取用户信息
    this.getUserInfo()
    // 获取Logo信息
    this.getLogo()
    // 初始化布局大小
    this.initialSize()
    this.$successTip({ msg: `欢迎您${this.$getMemoryPmt('username')}`, title: `Welcome` })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  computed: {
    ...mapState({
      themeColor: state => state.setting.themeColor,
      showLogo: state => state.setting.showLogo,
      isVerticleMenu: state => state.setting.isVerticleMenu,
      showBreadcrumb: state => state.setting.showBreadcrumb,
      showTags: state => state.setting.showTags,
      showFooter: state => state.setting.showFooter,
      menuStyle: state => state.setting.menuStyle,
      background: state => state.setting.background,
      layoutSize: state => state.setting.layoutSize,
      tagsList: state => state.tags.tagsList,
      menuList: state => state.menu.menuList,
			cacheViews: state => state.cacheViews.cacheViews
    }),
    menuBackgroundColor() {
      return this.menuStyle === 'dark'
        ? this.defaultConfig.menuStyle.dark.backgreundColor
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
  mounted() {
    // 初始化样式
    this.initialStyle()
    // 初始化滚动条
    this.initialScrollBar()
    this.initialListener()
    // 获取视窗大小
    this.getWindowWidth()
    /**
     * @description 初始化页面样式
     * 由于菜单生成有滞后性，所以使用循环定时器进行页面初始化，如果菜单生成完毕，则初始化页面并停止循环定时器
     */
    this.interval = setInterval(() => {
      if (document.querySelectorAll('.el-menu-item-group').length > 0) {
        this.initialmenuItemGroupStyle()
        clearInterval(this.interval)
      }
    })
  },
  methods: {
    // 初始化滚动条样式
    initialScrollBar() {
      if (!isMobile() && !isSafari()) {
        OverlayScrollbars(document.querySelector('#top'), {
          scrollbars: {
            autoHide: "move"
          }
        })
        const scrollContent = document.querySelector('.os-viewport')
        this.$setStyle(scrollContent, 'padding-bottom', '20px')
        scrollContent.scrollTop = this.$getMemorySes('scrollTop')
      }else {
        document.querySelector('#top').scrollTop = this.$getMemorySes('scrollTop')
      }
    },
    // 初始化布局大小
    initialSize() {
      Vue.prototype.$ELEMENT = { size: this.layoutSize, zIndex: 2000 }
    },
    // 初始化样式
    initialStyle() {
      const
        menuScrollBar = document.querySelector('.menu-scrollbar'),
        menuProp = document.querySelectorAll('.el-menu--popup'),
        menuItemGroup = document.querySelectorAll('.el-menu-item-group'),
        drawerContent = document.querySelector('.drawer-menu .ivu-drawer-content'),
        horizontalScrollbar = document.querySelector('.menu-horizontal-scrollbar>.el-scrollbar__wrap')
      this.$setStyle(
        horizontalScrollbar,
        'background',
        this.menuStyle === 'dark'
          ? this.defaultConfig.menuStyle.dark.backgroundColor
          : this.defaultConfig.menuStyle.light.backgroundColor)
      
      this.$setStyle( menuScrollBar, {
        background: this.menuStyle === 'dark'
        ? this.defaultConfig.menuStyle.dark.backgroundColor
        : this.defaultConfig.menuStyle.light.backgroundColor
      })
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
    // 初始化子菜单样式
    initialmenuItemGroupStyle() {
      const menuItemGroup = document.querySelectorAll('.el-menu-item-group')
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
    // 获取屏幕宽度
    getWindowWidth() {
      window.innerWidth < 1100
        ? (this.isSmall = true, this.isCollapse = true, this.isMenuCollapse = false)
        : this.isSmall = false
      window.innerWidth < 768
        ? (this.$refs.iconBox.isMini = true, this.isMini = true)
        : (this.$refs.iconBox.isMini = false, this.isMini = false)
    },
    // 获取滚动高度
    getScrollTop(obj) {
      const backtop = document.querySelector('.to-top')
      obj.scrollTop >= 100
        ? this.$setStyle(backtop, 'transform', 'scale(1)')
        : this.$setStyle(backtop, 'transform', 'scale(0)')
      this.$setMemorySes('scrollTop', obj.scrollTop)
    },
    // 事件监听
    initialListener() {
      const _this = this
      window.addEventListener('resize', this.getWindowWidth)
      if(!isMobile() && !isSafari()) {
        document.querySelector('.os-viewport').addEventListener('scroll', function () {
          _this.getScrollTop(this)
        })
      }else {
        document.querySelector('#top').addEventListener('scroll', function () {
          _this.getScrollTop(this)
        })
      }
    }
  }
}