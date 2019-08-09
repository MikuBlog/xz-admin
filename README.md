# :smirk: 页面浏览 

https://xzadmin.xuanzai.top

账号：xuanzai
密码：123456

<br/>

# :star: 安装步骤

安装：在项目目录下`npm install`

运行：在项目目录下`npm run serve`

查询文档[快速上手](http://xzadmin-docs.xuanzai.top)

如有问题，请看[已知问题列表](#question)

<br/>


# :sparkling_heart: 技术栈
使用了`vue`、`element-ui`作为主要技术栈

<br/>

# :electric_plug: 插件

+ 图表：`VCharts`
+ 数字滚动：`vue-count-to`
+ 树状选择器：`vue-treeselect`
+ 动态菜单折叠插件：`vue-fragment`
+ 进度条：`nprogress`
+ 富文本编辑器：`UEditor`
+ markdown编辑器：`mavonEditor`

<br/>


<h1 id="question">:page_with_curl: 已知问题</h1>

<br/>

> Module build failed (from ./node_modules/_svg-sprite-loader@4.1.6@svg-sprite-loader/lib/loader.js)

原因：引入了`svg-loader`，对已经处理过的`svg`再次进行处理导致报错

解决方案：类似这种问题，看看引入的全局`CSS`或自己写的`CSS`文件里有没有类似这样的语句：`url(xxxxx) format("truetype")) format("svg")`，如果有，则直接删除即可。

+ `mavonEditor`中的`index.css`中含有该组件，如果要继续使用`mavonEditor`markdown编辑器，请在`node_modules --> mavon-editor --> dist --> index.css`删除如上代码。



