const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 配置生产环境静态资源访问路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // 用于请求跨域资源,api等
  // devServer: {
  // 	open: true, //是否自动弹出浏览器页面
  // 	port: '8888', // 启动端口号
  // 	https: false, // 是否开启https
  // 	hotOnly: true, // 是否热更新
  // 	proxy: {
  // 		// 当匹配到前缀为timg
  // 		'/timg': {
  // 			target: 'https://timgsa.baidu.com', // 百度图片服务器地址
  // 			ws: true, //代理websockets
  // 			changeOrigin: true, // 虚拟的站点需要更管origin
  // 		},
  // 		'/news': {
  // 			target: 'http://n.sinaimg.cn', // 新浪图片服务器地址
  // 			ws: true,
  // 			changeOrigin: true
  // 		}
  // 	},
  // },
  chainWebpack: config => {
    // 检测webpack打包后的大小
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) 
    if (process.env.NODE_ENV === 'production') {
      // 图片压缩，避免打包后静态文件过大
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
    }
    // 解决IE打开空白页面问题
    config.module
      .rule('view-design')
      .test(/view-design.src.*?js$/)
      .use('babel')
      .loader('babel-loader')
      .end()
    config.module
      .rule("src")
      .test(/\.js/)
      .include.add(resolve("src"))
      .end()
      .use('babel')
      .loader('babel-loader')
      .end()
    // 避免svg处理冲突
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 模块按需加载
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // 代码分模块打包
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
