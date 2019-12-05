## 打包体积过大

现阶段已引入的第三方模块比较多，如：`element-ui`、`view-design`等等`UI`组件以及其他插件，打包后体积已有一定规模，如要再次在项目中引入依赖，请慎重！

解决方案

+ 利用[CDN](https://www.bootcdn.cn/)加速来解决本地依赖过多导致体积过大的问题。
+ 利用`vue.config.js`拆分包，提高包使用效率。
+ `nginx`配置`gzip`文件压缩，压缩后的`JavaScript`与`CSS`大概为原来的1/4。