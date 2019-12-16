import { isMobile, isIpad } from '@/utils/agent'
// 布尔类型的值改为false则表示不允许设置
export default {
  // 登录标题
  loginHeader: "XZ-Admin",
  // 自定义登录界面按钮
  loginSetting: true,
  // 合作网站账号登录框
  otherLoginMethods: true,
  // 自动登录框
  isAutoLogin: true,
  // 菜单颜色
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
    activeTextColor: '#429ee2'
  },
  // 系统样式设置
  diy: {
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
  // 全屏icon
  fullScreen: true,
  // 分页组件
  paginationLayout: `${
    // 是否为ipad
    isIpad()
      ? 'total, sizes, prev, pager, next'
      // 是否为移动设备
      : isMobile()
        ? 'prev, pager, next'
        // pc设备
        : 'total, sizes, prev, pager, next, jumper'
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