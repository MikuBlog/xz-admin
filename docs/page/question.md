## SVG被多次处理

+ 原因：引入了`svg-loader`，对已经处理过的`svg`再次进行处理导致报错

+ 解决方案：类似这种问题，看看引入的全局`CSS`或自己写的`CSS`文件里有没有类似这样的语句：`url(xxxxx) format("truetype")) format("svg")`，如果有，则直接删除即可。

### 已知含有该问题的组件
 
+ `mavonEditor`中的`index.css`中含有`SVG`处理语句，如果要继续使用`mavonEditormarkdown`编辑器，请在`node_modules --> mavon-editor --> dist --> index.css`删除如上代码。