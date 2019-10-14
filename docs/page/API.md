# API

如下的这些`API`都是作者封装好的，可直接在项目中使用。

## setStyle

描述：为`DOM`元素设置样式

参数：

+ `DOM`：`DOM`元素 [`DOM Object`]（必填）
+ `ruleName`：CSS属性 [`String`]（必填）
+ `style`：CSS属性值 [`String`]（必填）

示例:
```js
this.$setStyle(this.$refs.background, 'background-image', 'url(xxxx)')
```


## download

描述：文件下载

参数：

+ `url`：地址 [`String`]（必填）
+ `fileName`: 文件名称 [`String`]（必填）
+ `isBlob`: 是否为后台返回的二进制文件 [`Boolean`]（选填：默认为false）

示例：
```js
this.$download(url, fileName)
```

##  getImgFile

描述：获取图片信息，图片预览

参数：

+ `limit`：文件大小 [`Number`] 单位：兆（选填：默认限制文件大小为2M）

返回值：`Promise`

+ `raw`：二进制文件
+ `url`: base64图像文件

示例：
```js
this
	.$getImgFile(limit)
	.then((raw, url) => {
		console.log(raw, url)
	})
```

## previewFile

描述：预览文件

参数：

+ `url`：文件路径 [`String`]（必填）

示例：
```js
this.$previewFile(url)
```

## copyText

描述：复制文本

参数：

+ `DOM Object | content`：要复制的`DOM`元素文本或纯文本 [`DOM Object`/`String`]（必填）

示例
```js
this.$copyText("xuanzai")

this.$copyText(this.$refs.contentBox)
```

## urlQuery

描述：获取url后的参数

参数：

+ `url`: 需要解析的`url`字符串 [`String`]（选填：默认解析当前窗口地址）

示例
```js
this.$urlQuery([url]) // url: http://myinterface.xuanzai.top/getPicture?type=头像&id=1  result: { type: '头像', id: 1 }

```

## sortList

描述：获取url后的参数

参数：

+ `list`: 需要排序的数组 [`Array`]（必填）
+ `isDes`: 是否倒序（选填：默认为false）
+ `property`: 对象排序字段（选填：默认为空）

示例
```js
this.$sortList(list, true, 'level') 
```

## storage

通过`sessionStorage`与`localStorage`进行简单的封装。

### setMemorySes

描述：会话存储，写入

参数：

+ `key`: 键 [`String`]（必填）
+ `value`: 值 [`Any`]（必填）

示例：
```js
this.$setMemorySes("name", "xuanzai")
```

### getMemorySes

描述：会话存储，读取

参数：

+ `key`: 键 [`String`]（必填）

示例：
```js
this.$getMemorySes("name")
```

### setMemoryPmt

描述：长久存储，写入

参数：

+ `key`: 键 [`String`]（必填）
+ `value`: 值 [`Any`]（必填）
+ 
示例：
```js
this.$setMemoryPmt("name", "xuanzai")
```

### getMemoryPmt

描述：长久存储，读取

参数：

+ `key`: 键 [`String`]（必填）

示例：
```js
this.$getMemoryPmt("name")
```

## Message

通过`element-ui`的`Message`组件进行二次封装。

### successMsg

描述：成功提示

参数：

+ `content`：提示语 [`String`]（必填）

示例：
```js
this.$successMsg("成功")
```

### warnMsg

描述：警告提示

参数：

+ `content`：提示语 [`String`]（必填）

示例：
```js
this.$warnMsg("警告")
```

### errorMsg

描述：错误提示

参数：

+ `content`：提示语 [`String`]（必填）

示例：
```js
this.$errorMsg("错误")
```

### showMsgBox

描述：信息弹窗

参数：

+ `title`：标题 [`String`]（选填：默认为空）
+ `msg`：内容 [`String`/`HTML(isHTML为true时)`]（必填）
+ `isHTML`：内容是否为`html`标签 [`true`/`false`]（选填：默认为false）
+ `type`: 类型 [`success`/`warn`/`info`/`error`]（选填：默认为info）

返回值：`Promise`

示例：
```js
this.$showMsgBox({ [title: "标题"], msg: "内容", [isHTML: false], [type: info] })
```

## Notification

### successTip

描述：成功通知

参数：

+ `msg`：通知内容 [`String`]（必填）
+ `title`：通知标题 [`String`]（选填：默认为空）

示例：
```js
this.$successTip({ msg: "成功通知", title: "成功" })
```

### warnTip

描述：警告通知

参数：

+ `msg`：通知内容 [`String`]（必填）
+ `title`：通知标题 [`String`]（选填：默认为空）

示例：
```js
this.$warnTip({ msg: "警告通知", title: "警告" })
```

### errorTip

描述：错误通知

参数：

+ `msg`：通知内容 [`String`]（必填）
+ `title`：通知标题 [`String`]（选填：默认为空）

示例：
```js
this.$errorTip({ msg: "错误通知", title: "错误" })
```

## http

通过`axios`进行二次封装，如需更多个性化，请前往`src/api/http/http.js`文件内进行更改

### http_normal

描述：`application/x-www-form-urlencoded`键值对的上传方式

参数详情参考[axios文档](https://www.kancloud.cn/yunye/axios/234845)

返回值：`Promise`

示例：
```js
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

参数详情参考[axios文档](https://www.kancloud.cn/yunye/axios/234845)

返回值：`Promise`

示例：
```js
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

参数详情参考[axios文档](https://www.kancloud.cn/yunye/axios/234845)

返回值：`Promise`

示例：
```js
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