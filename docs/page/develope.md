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

过滤器统一存放在`src/initial/filter.js`文件里，只需按照该文件里面代码格式在该文件里进行编写即可。

示例：
```js
// 在原有基础上添加，变量名即为过滤器名称
const demo = (val) => {
	// todo
}

export default {
	demo,
	...
}
```

<br/>

## 注册指令

过滤器统一存放在`src/initial/directives.js`文件里，只需按照该文件里面代码格式在该文件里进行编写即可。

默认所有指令都以`inserted`、`componentUpdated`方式全局注册，即在组件挂载或组件及其子组件更新完毕的时候调用该指令。

示例：
```js
// 在原有基础上添加，变量名即为指令名称
const demo = (el, binding) => {
	// todo
}

export default {
	demo,
	...
}
```

如要使用其他方式进行指令绑定，请在`main.js`文件进行修改。

如下为默认自动全局注册自定义指令代码。

```js
/**
 * @author xuanzai
 * @description 全局指令初始化。在如下路径文件下全局注册指令即可。
 */
import directives from '@/initial/directives'

// 全局注册指令
Object
  .keys(directives)
  .forEach(key => {
    Vue.directive(key, {
      inserted: directives[key],
      componentUpdated: directives[key]
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
    // 更换主题颜色
    themeColor: true,
    // 更换主题风格
    themeStyle: true,
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
  // 不受主题影响的元素（标签、类、id）
  excludeEles: [
    "img",
    "video",
    "iframe",
    "embed",
    "object",
    '.el-message',
    '.el-notification',
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
```

<br/>

## 修改请求地址

请求地址在`public/js/baseUrl.js` 文件内，只需修改这串代码即可。

```
baseUrl = 'http://openlan.missiono.cn'	
```
