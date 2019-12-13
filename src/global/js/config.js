import Agent from '@/api/other/agent'
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
    // 面包屑
    breadcrumb: true,
    // 标签栏
    tagViews: true,
    // LOGO
    logo: true,
    // 页脚
    footer: true,
    // 更换主题
    theme: true,
    // 颜色翻转
    colorRotate: true,
    // 底片模式
    weakness: true,
    // 系统亮度
    brightness: true,
    // 更换菜单样式
    menu: true,
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
  // 布局大小icon
  layoutSize: true,
  // 分页组件
  paginationLayout: `${
    // 是否为ipad
    Agent.isIpad()
      ? 'total, sizes, prev, pager, next'
      // 是否为移动设备
      : Agent.isMobile()
        ? 'prev, pager, next'
        // pc设备
        : 'total, sizes, prev, pager, next, jumper'
    }`,
  // 分页大小
  paginationSize: Agent.isMobile() && !Agent.isIpad(),
  // 图片预览尺寸
  previewImageSize: `${
    Agent.isMobile() && !Agent.isIpad()
      ? '90%'
      : '500px'
    }`
}