# API

如下的这些`API`都是作者封装好的，可直接在项目中使用。

## setStyle

描述：为`DOM`元素设置样式

参数：

+ `DOM`：`DOM`元素 [`DOM Object`]
+ `ruleName`：CSS属性 [`String`]
+ `style`：CSS属性值 [`String`]

示例:
```js
this.$setStyle(this.$refs.background, 'background-image', 'url(xxxx)')
```


## download

描述：文件下载

参数：

+ `url`：地址 [`String`]

示例：
```js
this.$download(url)
```

##  getImgFile

描述：获取图片信息，图片预览

参数：

+ `limit`：文件大小 [`Number`] 单位：兆

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

+ `url`：文件路径 [`String`]

示例：
```js
this.$previewFile(url)
```

## copyText

描述：复制文本

参数：

+ `DOM Object | content`：要复制的`DOM`元素文本或纯文本 [`DOM Object`/`String`]

示例
```js
this.$copyText("xuanzai")

this.$copyText(this.$refs.contentBox)
```

## urlQuery

描述：获取url后的参数

示例
```js
this.$urlQuery() // url: http://myinterface.xuanzai.top/getPicture?type=头像&id=1  result: { type: '头像', id: 1 }

```

## storage

通过`sessionStorage`与`localStorage`进行简单的封装。

### setMemorySes

描述：会话存储，写入

参数：

+ `key`: 键 [`String`]
+ `value`: 值 [`Any`]

示例：
```js
this.$setMemorySes("name", "xuanzai")
```

### getMemorySes

描述：会话存储，读取

参数：

+ `key`: 键 [`String`]

示例：
```js
this.$getMemorySes("name")
```

### setMemoryPmt

描述：长久存储，写入

参数：

+ `key`: 键 [`String`]
+ `value`: 值 [`Any`]
+ 
示例：
```js
this.$setMemoryPmt("name", "xuanzai")
```

### getMemoryPmt

描述：长久存储，读取

参数：

+ `key`: 键 [`String`]

示例：
```js
this.$getMemoryPmt("name")
```

## Message

通过`element-ui`的`Message`组件进行二次封装。

### successMsg

描述：成功提示

参数：

+ `content`：提示语 [`String`]

示例：
```js
this.$successMsg("成功")
```

### warnMsg

描述：警告提示

参数：

+ `content`：提示语 [`String`]

示例：
```js
this.$successMsg("警告")
```

### errorMsg

描述：错误提示

参数：

+ `content`：提示语 [`String`]

示例：
```js
this.$successMsg("错误")
```

### showMsgBox

描述：信息弹窗

参数：

+ `title`：标题 [`String`]
+ `msg`：内容 [`String`/`HTML(isHTML为true时)`]
+ `isHTML`：内容是否为`html`标签 [`true`/`false`]
+ `type`: 类型 [`success`/`warn`/`info`/`error`]

返回值：`Promise`

示例：
```js
this.$showMsgBox({ [title: "标题"], msg: "内容", [isHTML: false], [type: info] })
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