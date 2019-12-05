import Agent from '@/api/other/agent'
export default {
  // 登录标题
  loginHeader: "XZ-Admin",
  // 是否显示自定义登录界面按钮
  loginSetting: true,
  // 是否显示合作网站账号登录框
  otherLoginMethods: true,
  // 是否显示自动登录框
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
  paginationLayout: `${ Agent.isMobile() 
    ? 'prev, pager, next' 
    : 'total, sizes, prev, pager, next, jumper'}`,
  // 分页大小
  paginationSize: Agent.isMobile()
}