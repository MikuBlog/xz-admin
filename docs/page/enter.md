# 入门

<br/>
<br/>

## 快速开始

新建一个文件夹，在该目录下直接使用如下命令
```
git clone https://github.com/MikuBlog/xz-admin.git
```

进入到下载好的项目目录下，使用如下命令进行依赖安装
```
npm install

```

在项目根目录下执行以下命令运行项目
```
npm run serve

```

## 目录结构

```
├─api // 存放自行封装的api
│  ├─database
│  ├─dom
│  ├─file
│  ├─http
│  ├─iconfont
│  ├─json
│  ├─message
│  ├─other
│  └─storage
├─assets // 静态资源文件
│  ├─error
│  ├─loading
│  ├─login
│  ├─logo
│  └─welcome
├─components // 第三方与自行封装的组件
│  ├─breadcrumb
│  ├─editor
│  ├─icon_select
│  ├─scrollpane
│  ├─search_menu
│  ├─SvgIcon
│  ├─tag
│  ├─tree_menu
│  └─tree_table
├─global // 全局模块
│  ├─css
│  └─js
├─icons // 存放SVG图标
│  └─svg
├─initial // 第三方插件、过滤器、自定义指令、样式初始化
│  └─UI
├─Layout // 布局组件
├─router // 路由模块
├─store // vuex
│  └─modules
├─utils // 工具类函数
└─views // 页面
    ├─article
    ├─chart
    │  ├─mixins
    │  └─style
    ├─common
    │  ├─editor
    │  ├─file
    │  ├─icon
    │  │  ├─mixins
    │  │  └─style
    │  └─markdown
    │      └─mixins
    ├─docs
    ├─error
    ├─introduction
    ├─Layout
    │  ├─components
    │  ├─mixins
    │  └─style
    ├─log
    │  ├─authority_log
    │  │  ├─components
    │  │  └─mixins
    │  ├─exception_log
    │  │  └─mixins
    │  └─operation_log
    │      └─mixins
    ├─login
    │  ├─mixins
    │  └─style
    ├─menu_1
    ├─menu_2
    ├─menu_3
    ├─monitor
    │  ├─online_user
    │  │  └─mixins
    │  └─redis_manage
    │      └─mixins
    ├─order
    ├─person
    │  └─components
    ├─system
    │  ├─authority
    │  │  ├─components
    │  │  └─mixins
    │  ├─department
    │  │  ├─components
    │  │  └─mixins
    │  ├─dictionary
    │  │  ├─components
    │  │  └─mixins
    │  ├─menu
    │  │  ├─components
    │  │  └─mixins
    │  ├─role
    │  │  ├─components
    │  │  └─mixins
    │  ├─station
    │  │  ├─components
    │  │  └─mixins
    │  └─user
    │      ├─components
    │      └─mixins
    ├─tools
    │  ├─file
    │  │  └─components
    │  ├─generator
    │  │  ├─components
    │  │  └─mixins
    │  ├─mission
    │  │  ├─components
    │  │  └─mixins
    │  └─picture
    │      ├─components
    │      └─mixins
    └─welcome
```

## 页面模块结构

为了方便后期维护开发，本后台管理系统模板对每个页面模块拆分成如下结构：

```
│  ├─menu // 页面模块名称
│  │  ├─components // 页面组件
│  │  └─style // 页面样式
│  │  │  └─index.scss
│  │  └─mixins // 业务逻辑模块
│  │  │  └─initial.js // 初始化文件
│  │  │  └─operation.js // 页面逻辑文件
│  │  │  └─property.js // 响应式属性管理文件
│  │  ├─index.vue // 页面
```
