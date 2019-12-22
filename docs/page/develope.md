## 添加路由

路由是通过后台返回的数据动态生成的，所以，只需要在菜单管理处添加菜单的同时添加组件的路径即可。

组件初始路径默认为`views`目录下。

<br/>


## 添加icon

通过强大的阿里妈妈[iconfont](https://www.iconfont.cn/)平台下载自己喜欢的`icon`。

将下载好的`SVG`文件放到`src/icons/svg`目录下，即可自动生成`icon`。

引入后可直接使用：

```
<svg-icon icon-class="icon的名字"/>
```

同样可以使用[font-awesome](http://fontawesome.dashgame.com/)提供的图标，项目中已经引入

```
<i class="fa fa-address-book"></i>
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

## 注册过滤器

过滤器统一存放在`src/initial/filter`文件夹里。

`src/initial/filter/index.js`为出口文件，所有全局过滤器都在该文件里导出。

示例：
```js
/* 过滤器文件 */
function demo(val, format) {
  // todo
}

export default demo

/* 入口文件index.js */

import demo from './demo'
export default {
  demo
}
```

在任意组件中使用：
```js
{{ property | demo('xxx') }}
```

<br/>

## 注册指令

过滤器统一存放在`src/initial/directives`文件夹里。

`src/initial/directives/index.js`为出口文件，所有全局指令都在该文件里导出。

指令有五个钩子函数（参考官网），具体配置可参考`src/initial/directives`里的其他指令文件。

示例：
```js
/* 指令文件 */

function fn1(el, binding) {
  // todo
}
function fn2(el, binding) {
  // todo
}

// ...

// 钩子函数选择传入（默认为空函数）
export default {
  bind: fn1,
  inserted: fn2,
  update: fn3,
  componentUpdated: fn4,
  unbind: fn5
}

/* 出口文件index.js */

import demo from './demo'
export default {
  demo
}
```

在任意组件中使用指令：
```js
<component v-demo="property" />
```

如下为默认自动全局注册自定义指令代码。

```js
/**
 * @author xuanzai
 * @description 全局指令初始化。在如下路径文件下全局注册指令即可。
 */
import directives from '@/initial/directives/index'

// 全局注册指令
Object
  .keys(directives)
  .forEach(key => {
    Vue.directive(key, {
      // 只调用一次，指令第一次绑定到元素时调用
      bind: directives[key].bind || (() => {}),
      // 被绑定元素插入父节点时调用
      inserted: directives[key].inserted || (() => {}),
      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
      update: directives[key].update || (() => {}),
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated: directives[key].componentUpdated || (() => {}),
      // 只调用一次，指令与元素解绑时调用
      unbind: directives[key].unbind || (() => {})
    })
  })
```

<br/>

## 注册组件

组件统一存放在`src/components`文件里。

如下为默认自动全局注册自定义组件代码。

最终读取`src/components`下的所有`index.vue`文件进行组件注册。

```js
/**
 * @author xuanzai
 * @description 全局注册组件。
 */
const req = require.context('@/components', true, /index\.vue$/)

// 全局注册组件
req
  .keys()
  .forEach(val => {
    const component = req(val).default
    Vue.component(component.name, component)
  })
```

注意：自动注册组件依赖组件名称，因此，请在封装组件时给组件加上`name`字段。

```js
export default {
  name: "component", // 组件名称
  // todo
}
```

在任意组件中使用：
```js
<component/>
```

<br/>

## 全局配置

在`src/global/js/config.js`文件下，有全局统一配置信息。操作这些信息方便改后打包使用。

这些属性时暂时的，往后会推出更多可配置项~

```js
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
    }
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
  // 布局透明元素（系统设置中的背景设置）
  layoutOpacity: [
    '.el-card',
    '.el-scrollbar',
    '.el-header',
    '.tabs',
    '.el-footer',
    '.opacity-box'
  ],
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
```

<br/>

## 修改请求地址

请求地址在`public/js/baseUrl.js` 文件内，只需修改这串代码即可。

```
baseUrl = 'http://openlan.missiono.cn'	
```
