# :smirk: 页面浏览 

https://xzadmin.xuanzai.top

账号：admin
密码：123456

<br/>

# :star: 安装步骤

安装：在项目目录下`npm install`

运行：在项目目录下`npm run serve`

如有问题，请看已知问题列表

<br/>

# :ok_hand: 页面开发进度

已完成所有，日后再添加

<br/>

# :muscle: 已对接接口

- 登录
- 系统管理
  - 字典管理
  - 菜单管理
  - 岗位管理
  - 权限管理
  - 用户管理
  - 部门管理
  - 权限管理
- 日志管理
  - 操作日志
  - 异常日志 
  - 权限日志
- 系统监控
  - 系统缓存
- 系统工具
  - 图片管理

<br/>

# :bulb: 已有功能

+ 个性化登录界面
+ 个性化后台管理界面
+ 标签管理
+ 动态路由
+ 动态菜单
+ 面包屑管理
+ 自动登录
+ 无权限自动跳转回登录页面
+ 退出登录清空上一用户的所有访问记录

<br/>

# :earth_asia: 页面布局

+ 弹性布局
+ 响应式布局
+ 响应式菜单
+ 可滚动标签页

<br/>


# :sparkling_heart: 技术栈
使用了`vue`、`element-ui`、`iview`作为主要技术栈

<br/>

# :electric_plug: 插件

+ 富文本编辑器：`UEditor`
+ 图表：`VCharts`
+ 数字滚动：`vue-number-scroll`
+ 树状选择器：`vue-treeselect`
+ 动态菜单折叠插件：`vue-fragment`
+ 进度条：`nprogress`

<br/>

# :page_with_curl: 已知问题

> 有些图标不能正常显示

原因：因为在`vue.config.js`中加了`svg`处理器，用于处理添加菜单时`svg`图片的显示，所以导致了有些`svg`图标被处理了两次，不能正常显示。

解决方案：node_modules --> iview --> dist --> styles --> iview.css --> 删除`svg`处理代码（ctrl + F 查删）
