import { isMobile, isIpad } from '@/utils/agent'
// 布尔类型的值改为false则表示不允许设置,保存后刷新页面即可生效
export default {
  // 登录标题
  loginHeader: "XZ-ADMIN",
  // 自定义登录界面按钮
  loginSetting: true,
  // 合作网站账号登录框
  otherLoginMethods: true,
  // 自动登录框
  isAutoLogin: true,
  // 菜单风格
  menuStyle: {
    light: {
      textColor: '#444',
      backgroundColor: '#fefefe',
      subMenuItemBackgroundColor: '#f7f7f7'
    },
    dark: {
      textColor: '#becad8',
      backgroundColor: '#2f4055',
      subMenuItemBackgroundColor: '#1e2c3c'
    },
		// 设置后将无法通过"更改主题"进行修改
		activeTextColor: "",
		// 菜单悬浮颜色设置
		hoverBackgroundColor: "rgba(206, 206, 206, 0.3)"
  },
	// 系统样式默认配置项
	default: {
		// 默认主题颜色
		themeColor: "#409eff",
		// 默认标签页颜色
		tagsColor: '#409eff',
		// 默认布局大小
		layoutSize: 'medium',
		// 默认主题样式(lightMode/darkMode/weaknessMode/hueRotateMode)
		themeStyle: 'lightMode',
		// 默认系统亮度
		brightness: 100,
		// 默认菜单风格(light/dark)
		menuStyleType: 'dark',
		// 默认菜单布局(true为垂直,false为水平)
		menuLayout: true,
		// 默认显示Logo
		showLogo: true,
		// 默认显示标签页
		showTags: true,
		// 默认显示面包屑
		showBreadcrumb: true,
		// 默认显示页脚
		showFooter: true
	},
  // 系统样式允许配置项
  diy: {
		/* 动画 */
		// 路由过渡动画
		routerAnimation: true,
		// 面包屑过渡动画
		breadcrumbAnimation: true,
    /* 系统布局模块 */
    layout: true,
    // 系统布局大小
    layoutSize: true,
    // 面包屑
    breadcrumb: true,
    // 标签栏
    tagViews: true,
    // LOGO
    logo: true,
    // 页脚
    footer: true,
    /* 系统主题模块 */
    theme: true,
    // 更换主题颜色
    themeColor: true,
    // 更换主题风格
    themeStyle: true,
    // 系统亮度
    brightness: true,
    // 更换菜单样式
    menu: true,
    /* 系统模块 */
    background: true,
    // 背景颜色
    backgroundColor: true,
    // 背景透明度
    backgroundOpacity: true,
    // 卡片透明度
    cardOpacity: true,
    // 背景模糊度
    backgroundBlur: true,
    // 背景遮罩浓度
    backgroundMask: true,
    // 选择背景按钮
    selectBackrgoundButton: true,
  },
  // 布局透明元素（系统设置-->背景设置-->布局透明度）
  layoutOpacity: [
    '.el-card',
    '.el-header',
    '.menu-scrollbar',
    '.menu-horizontal-scrollbar',
    '.el-footer',
    '.opacity-box',
  ],
  // 不受主题影响的元素（标签、类、id）
  excludeEles: [
    "img", // 图片
    "video", // 视频
    "iframe", // 内嵌网站
    "embed", // 插件
    "object",
    '.el-message', // 提示信息
    '.el-notification', // 通知信息
    '.mask',
    /* 背景图 */
    '[style*="background:url"]',
    '[style*="background-image:url"]',
    '[style*="background: url"]',
    '[style*="background-image: url"]',
    '[style*="background-image"][style*="image-set"]'
  ],
  // 搜索菜单icon
  searchMenu: true,
  // 文档icon
  helpPage: true,
  // 清除缓存icon
  clearStorage: true,
  // 系统设置icon
  systemSetting: true,
  // 错误日志icon
  errorLog: true,
  // 全屏icon
  fullScreen: true,
  // 分页组件
  paginationLayout: `${
    // 是否为ipad
    isIpad()
      ? 'pager, sizes, total, prev, next'
      // 是否为移动设备
      : isMobile()
        ? 'prev, pager, next'
        // pc设备
        : 'prev, pager, next, sizes, total, jumper'
    }`,
  // 分页大小
  paginationSize: isMobile() && !isIpad(),
  // 图片预览尺寸
  previewImageSize: `${
    isMobile() && !isIpad()
      ? '90%'
      : '500px'
    }`
}