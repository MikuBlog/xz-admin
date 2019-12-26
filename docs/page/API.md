# API

如下的这些`API`都是作者封装好的，可直接在项目中使用。

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

返回值：`Object`

+ `key`: 参数名称
+ `value`: 参数值

示例：
```js
this.$urlQuery([url]) // url: http://myinterface.xuanzai.top/getPicture?type=头像&id=1  result: { type: '头像', id: 1 }

```

## print

描述：打印文档

注意：该`API`不兼容`IE`

参数：

+ `page`：`HTML`字符串[`String`]（选填：默认为空）

示例：
```js
this.$print(page)
```

## createSocket

描述：连接`wesocket`

参数：

+ `option`：看示例[`Object`]（选填）

返回值：`WebSocket`实例

示例：
```js
this
  .$createSocket(
    {
      url: "ws://xxx.com/xxx", // 连接websocket地址（必填）
      onOpen(e) {}, // websokcet打开后的回调（选填）
      onMessage(e) {}, // websocket接收到信息后的回调（选填）
      onError(e) {}, // websocket出错后的回调（选填）
      onClose(e) {} // websocket关闭后的回调（选填）
    }
  ) // 返回WebSocket实例
```

## Theme

所有主题模式都用在`body`标签上，也就是所有样式都会被改为对应的主题模式

注意：一次性设置多种主题不会重叠，而是相互覆盖。（不兼容`IE`，影响部分浏览器的流畅度）

如果有的元素不想被主题样式覆盖掉，请前往`src/global/js/config.js`文件进行配置：

```js
// 不受主题影响的元素（标签、类、id）
excludeEles: [
  "img", // 图片
  "video", // 视频
  "iframe", // 内嵌网站
  "embed", // 插件
  "object",
  '.el-message', // 提示信息
  '.el-notification', // 通知信息
  /* 背景图 */
  '[style*="background:url"]',
  '[style*="background-image:url"]',
  '[style*="background: url"]',
  '[style*="background-image: url"]',
  '[style*="background-image"][style*="image-set"]'
],
```

### clearMode

描述：白昼模式主题，也称为正常模式，调用该方法后会重置所有主题样式。

示例：
```js
this.$clearMode() // 开启白昼模式
```

### darkMode

描述：夜间模式主题

参数：

`isDark`：是否为黑暗模式[`Boolean`]（选填：默认值为true，关闭时需传入false）

示例：
```js
this.$darkMode() // 开启夜间模式
this.$darkMode(false) // 关闭夜间模式
```

### weaknessMode

描述：色弱模式

参数：

`isWeakness`：是否为色弱模式[`Boolean`]（选填：默认值为true，关闭时需传入false）

示例：
```js
this.$weaknessMode() // 开启色弱模式
this.$weaknessMode(false) // 关闭色弱模式
```

### hueRotateMode

描述：转换模式

参数：

`isHueRotate`：是否为转换模式[`Boolean`]（选填：默认值为true，关闭时需传入false）

示例：
```js
this.$hueRotateMode() // 开启转换模式
this.$hueRotateMode(false) // 关闭转换模式
```

## Array

### sortList

描述：对元素为对象的数组进行排序

注意：只对值为日期、数字、字符串为数字的字段进行排序。原数组会改变。

参数：

+ `list`: 需要排序的数组 [`Array`]（必填）
+ `isDes`: 是否倒序[`Boolean`]（选填：默认为false）
+ `property`: 对象排序字段[`String`]（选填：默认为空）

返回值：`Array`

示例：
```js
let list = [{ name: "旋仔", level: 3 }, 
{ name: "旋仔", level: 1 }, 
{ name: "旋仔", level: 2 }]
this.$sortList(list, true, 'level') // [{ name: "旋仔", level: 3 }, { name: "旋仔", level: 2 }, { name: "旋仔", level: 1 }]
```

### searchResult

描述：查找元素（模糊搜索）

参数：

+ `list`: 需要查找的数组 [`Array`]（必填）
+ `keys`: 查找包含的字段[`Array`]（必填）
+ `value`: 需要查找的值[`String`]（必填）

返回值：`Array`

示例：
```js
let list = [{ name: "旋仔", age: 20 }, { name: "小伙子", age: 16 }]
this.$searchResult(list, ['name'], '旋仔') // [{ name: "旋仔", age: 20 }]
this.$searchResult(list, ['name'], 'xxx') // []
```

## control

### debounce

描述：防抖函数

效果：用户交互行为过于频繁而被禁止调用，一段时间后释放

参数：

+ `callback`：回调函数（必填）
+ `time`：防抖时间间隔（必填）
+ `immediate`：第一次点击是否立刻执行（选填：默认为true）

返回值：`Function`

示例：
```js
const callback = () => {
  // todo
}
const debounceFun = this.$debounce(callback, 2500, true)
```

### throttled

描述：节流函数

效果：用户交互行为间隔触发回调，防止用户频繁点击

参数：

+ `callback`：回调函数（必填）
+ `wait`：节流时间间隔（必填）

返回值：`Function`

示例：
```js
const callback = () => {
  // todo
}
const throttledFun = this.$throttled(callback, 2500)
```

## Style

### setStyle

描述：为`DOM`元素设置样式

注意：设置的样式为内联样式，不会覆盖所有内联样式，而是通过追加的形式添加样式

参数：

+ `DOM`：`DOM`元素 [`DOM Object`]（必填）
+ `ruleName`：CSS属性或组合CSS对象 [`String` | `Object`]（必填）
+ `style`：CSS属性值 [`String`]（必填）

示例：
```js
// 设置单个属性
this.$setStyle(this.$refs.background, 'background-image', 'url(xxxx)')
// 设置多个属性
this.$setStyle(this.$refs.background, {
  backgroundImage: 'url(xxx)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
})
```

### setCssText

描述：为`DOM`元素设置内联样式

注意：设置后会覆盖原有的内联样式

参数：

+ `DOM`：`DOM`元素 [`DOM Object`]（必填）
+ `CSS`：CSS语法 [`String`]（必填）

示例：
```js
this.$setCssText(this.$refs.background, `
  background: #666;
  padding: 20px;
`)
```

### createStyle

描述：创建全局样式

注意：通过创建`style`标签并动态追加到`head`标签内完成样式的全局覆盖

参数：

+ `css`：CSS语法 [`String`]（必填）
+ `className`：类名[`String`]（选填，如果不填该属性，则每次调用都会创建一个新的`style`标签）

示例：
```js
this.$createStyle(`
  body {
    background: #666;
    padding: 20px;
  }
`)
```

## File

### download

描述：文件下载（自带`tips`以及`loading`）

> [批量下载文件](#exportfile)

参数：

+ `url`：文件地址 [`String`]（必填）
+ `fileName`: 文件名称 [`String`]（选填：默认为原文件名称）

示例：
```js
// 文件下载
this.$download(url, fileName)
```

###  getImgFile

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
		// todo
	})
```

###  getFile

描述：获取文件信息

参数：

+ `limit`：文件大小 [`Number`] 单位：兆（选填：默认限制文件大小为2M）

返回值：`Promise`

+ `raw`：二进制文件

示例：
```js
this
	.$getFile(limit)
	.then(raw => {
		// todo
	})
```

### previewFile

描述：预览文件

注意：该`api`使用了微软的预览接口，因此，请保证网络状态良好且文件必须能通过外链被访问到。

参数：

+ `url`：文件路径 [`String`]（必填）

示例：
```js
this.$previewFile(url)
```

### exportExcel

描述：将表格导出到`excel`文件中

注意：导出的数据为当前表格的数据，而不是所有表格数据

参数：

+ `obj`：选中的表格元素 [`DOM | Array(DOM)`]（必填）
+ `name`: 文件名称[`String`]（选填：默认为table）

示例：
```js
this.$exportExcel(document.querySelector('table'), 'data') // 导出一整个表格
this.$exportExcel(document.querySelectorAll('tr'), 'data') // 导出选中元素的表格（数组元素必须为tr标签元素）
```

### exportFile

描述：批量导出文件并以`zip`文件保存（包括图片、excel、word等各种类型的文件，自带`tips`以及`loading`）

参数：

+ `fileList`：文件地址列表 [Array]（必填）
+ `fileName`：压缩文件名称 [String]（选填：默认为file）

示例：
```js
this.$exportFile(fileList, 'images')
```

## Date

日期格式化方法。

### formatDate

描述：将日期格式化为`yyyy-MM-dd HH:mm:ss`

参数：

+ `date`: 日期对象[`Date`]（必填）
+ `isAccurate`: 是否精确到时分秒[`Boolean`]（选填：默认为false）

示例：
```js
this.$formatDate(new Date()) // 2019-11-05
this.$formatDate(new Date(), true) // 2019-11-05 10:06:31
```

### dateDiff

描述：两个日期的天数差

参数：

+ `sDate1`: 结束日期[`Date`]（必填）
+ `sDate2`: 开始日期[`Date`]（必填）
+ `isNegative`: 只能是结束日期减开始日期，返回的值可能为负值（选填：默认为false）

返回值：`Number`

示例：
```js
this.$dateDiff(new Date('2019-11-05'), new Date('2019-11-01')) // 4
this.$dateDiff(new Date('2019-11-01'), new Date('2019-11-05')) // 4
this.$dateDiff(new Date('2019-11-05'), new Date('2019-11-01'), true) // 4
this.$dateDiff(new Date('2019-11-01'), new Date('2019-11-05'), true) // -4
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
	// todo
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
	// todo
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
	// todo
})
```

## jquery

描述：该项目引入了`jquery`，可在任何组件或页面中使用。

具体`API`请参考网上文档。

示例：
```js
// 获取DOM
$("head")

// 请求
$.ajax({
  url: "xxx",
  type: "get"
}).then(result => {
  // todo
})
```
