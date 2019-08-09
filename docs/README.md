# 介绍

前端使用`Vue`、`element-ui`作为主要技术栈，开发了一套后台管理系统。

该系统数据库使用了`RBAC`模式进行设计，带有用户管理、权限管理、角色管理、菜单管理、部门管理、岗位管理等模块。

<br/>
<br/>
<br/>

# 入门

<br/>
<br/>

## 快速开始

新建一个文件夹，在该目录下直接使用如下命令
```
git clone https://github.com/MikuBlog/xz  -admin.git

```

进入到下载好的项目目录下，使用如下命令进行依赖安装
```
npm install

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
├─components // 第三方组件
│  ├─breadcrumb
│  ├─editor
│  ├─icon_select
│  ├─scrollpane
│  ├─SvgIcon
│  ├─tag
│  ├─tree_menu
│  └─tree_table
├─global
├─icons // 
│  └─svg
├─initial // 第三方插件与过滤器初始文件
├─Layout // 布局组件
├─router // 路由核心文件
├─store // vuex
└─views // 页面布局文件
```


# 开发手册

## 添加路由

路由是通过后台返回的数据动态生成的，所以，只需要在菜单管理处添加菜单的同时添加组件的路径即可。

组件初始路径默认为`views`目录下。

<br/>


## 添加icon

通过强大的阿里妈妈iconfont平台下载自己喜欢的icon：`https://www.iconfont.cn/`。

将下载好的`SVG`文件放到`src/icons/svg`目录下，即可自动生成`icon`。

引入后可直接使用：

```
<svg-icon icon-class="icon的名字"/>
```

<br/>

## 添加页面

页面统一存放在`src/views`目录下。

页面创建好后，在菜单管理模块添加对应的菜单项，填写组件路径即可动态生成路由。

<br/>

## 第三方插件

第三方插件的引入代码都统一存放在了`src/initial/module.js`文件里，当然，也可以根据自己的喜欢放在任何地方。

<br/>

## 第三方组件

第三方组件统一存放在`src/components`目录下。

<br/>

## 数据过滤器

过滤器统一存放在`src/initial/filter.js`文件里，只需按照该文件里面代码格式在该文件里进行编写即可。

<br/>

## 修改请求地址

请求地址在`src/api/http.js` 文件内，只需修改这串代码即可。

```
axios.defaults.baseURL = 'http://openlan.missiono.cn'	
```

# API

## setStyle

描述：为`DOM`元素设置样式

+ `DOM`：`DOM`元素
+ `ruleName`：CSS属性
+ `style`：CSS属性值

示例:
```
this.$setStyle(this.$refs.background, 'background-image', 'url(xxxx)')
```


## download

描述：文件下载

示例：
```
this.$download(url)
```

##  getImgFile

描述：获取图片信息，图片预览

+ `limit`：文件大小 [`Number`] 单位：兆

返回值：`Promise`

+ `raw`：二进制文件
+ `url`: base64图像文件

示例：
```
this
	.$getImgFile(limit)
	.then((raw, url) => {
		console.log(raw, url)
	})
```

## previewFile

描述：预览文件

+ `url`：文件路径 [`String`]

示例：
```
this.$previewFile(url)
```


## storage

通过`sessionStorage`与`localStorage`进行简单的封装。

### setMemorySes

描述：会话存储，写入

示例：
```
this.$setMemorySes("name", "xuanzai")
```

### getMemorySes

描述：会话存储，读取

示例：
```
this.$getMemorySes("name")
```

### setMemoryPmt

描述：长久存储，写入

示例：
```
this.$setMemoryPmt("name", "xuanzai")
```

### getMemoryPmt

描述：长久存储，读取

示例：
```
this.$getMemoryPmt("name")
```

## Message

通过`element-ui`的`Message`组件进行二次封装。

### successMsg

描述：成功提示

示例：
```
this.$successMsg("成功")
```

### warnMsg

描述：警告提示

示例：
```
this.$successMsg("警告")
```

### errorMsg

描述：错误提示

示例：
```
this.$successMsg("错误")
```

### showMsgBox

描述：信息弹窗

+ `title`：标题 
+ `msg`：内容
+ `isHTML`：内容是否为`html`标签 [`true`/`false`]
+ `info`: 类型 [`success`/`warn`/`info`/`error`]

返回值：`Promise`

示例：
```
this.$showMsgBox({ [title: "标题"], msg: "内容", [isHTML: false], [type: info] })
```

## http

通过`axios`进行二次封装，如需更多个性化，请前往`src/api/http/http.js`文件内进行更改

### http_normal

描述：`application/x-www-form-urlencoded`键值对的上传方式

返回值：`Promise`

示例：
```
this.$http_normal({
	url: "/xxx/xxx",
	method: "post",
	data: {
		name: "",
		age: ""
	}
}).then(result => {
	console.log(result.data)
})
```

### http_json

描述：`application/json`，`JSON`字符串的上传方式

返回值：`Promise`

示例：
```
this.$http_json({
	url: "/xxx/xxx",
	method: "post",
	data: {
		name: "",
		age: ""
	}
}).then(result => {
	console.log(result.data)
})
```

### http_file

描述：`multipart/form-data`，多文件键值对的上传方式

返回值：`Promise`

示例：
```
this.$http_file({
	url: "/xxx/xxx",
	method: "post",
	data: {
		name: "",
		age: ""，
		file_1: raw_1,
		file_2: raw_2
	}
}).then(result => {
	console.log(result.data)
})
```