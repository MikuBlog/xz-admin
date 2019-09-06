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
│  ├─SvgIcon
│  ├─tag
│  ├─tree_menu
│  └─tree_table
├─global // 全局模块
│  ├─css
│  └─js
├─icons // 存放SVG图标
│  └─svg
├─initial // 第三方插件、过滤器、自定义指令初始化
├─Layout // 布局组件
├─router // 路由核心文件
├─store // vuex
│  └─modules
├─utils // 工具类函数
└─views // 页面组件
    ├─article
    ├─chart
    ├─common
    │  ├─editor
    │  ├─file
    │  ├─icon
    │  └─markdown
    ├─error
    ├─introduction
    ├─Layout
    ├─log
    ├─login
    ├─menu_1
    ├─menu_2
    ├─menu_3
    ├─monitor
    ├─order
    ├─person
    ├─system
    │  ├─authority
    │  ├─department
    │  ├─dictionary
    │  ├─menu
    │  ├─role
    │  ├─station
    │  └─user
    ├─tools
    │  ├─mission
    │  └─picture
    └─welcome
```
