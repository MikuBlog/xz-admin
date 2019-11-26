# 部署上线

<br/>
<br/>

## 项目打包

执行以下命令进行项目打包
```
npm run build
```

> 建议安装`finalshell`，一款服务器可视化工具，方便管理自己的服务器。

### window

- 到`nginx`官网下载`window`版压缩包（作者使用的是`nginx-1.14.2`）

> http://nginx.org/en/download.html

- 在任意位置解压`nginx`压缩包

- 进入`nginx`根目录，并在`html`目录下新建一个文件夹`admin`文件夹

- 回到`nginx`根目录，并进入到`conf`目录下，找到`nginx.conf`并打开

- 找到`http`域并另起一行，加入如下代码：

```
sever {
  listen 80;
  server_name xxx.com;#(您的域名)
  location / {
    root html/admin;
		try_files $uri $uri/ /index.html;
		index index.html;
  }
}
```

- 回到`nginx`根目录，双击`nginx.exe`运行`nginx`

### linux

- 安装`nginx`

  - 配置`nginx`安装仓库

  ```
  vim /etc/yum.repos.d/nginx.repo
  ```

  - 填入配置信息并保存退出

  ```
  [nginx]
  name=nginx repo
  baseurl=http://nginx.org/packages/centos/7/$basearch/
  gpgcheck=0
  enabled=1
  ```

  - 下载并安装`nginx`

  ```
  yum install nginx
  ```

  - 检查是否安装成功

  ```
  nginx -v
  ```

  - 如果有显示版本信息，那么则安装成功。作者提示的信息如下（现在最新版本为1.16.x）：

  ```
  nginx version: nginx/1.14.0
  ```

- 配置`nginx`

  - 进入到配置文件目录下

  ```
  cd /etc/nginx/conf.d
  ```

  - 新建服务器文件

  ```
  touch admin.conf
  ```

  - 配置`admin.conf`文件

  ```
  vim admin.conf
  ```

  - 填入如下配置内容：

  ```
  server {
    listen 80;
    server_name xxx.com;#(您的域名)
    location / {
      root /usr/share/nginx/admin;
      try_files $uri $uri/ /index.html;
      index index.html;
    }
  }
  ```

- 新建前端静态文件目录
   
  - 进入到如下目录：

  ```
  cd /usr/share/nginx
  ```

  - 创建`admin`文件夹：

  ```
  mkdir admin
  ```

  - 进入到`admin`文件夹目录下：

  ```
  cd admin
  ```

- 将打包好的文件上传至该文件夹里，`admin`内文件目录如下：

```
├─assets
│  ├─css
│  ├─images
│  └─js
├─css
├─fonts
├─img
├─js
└─ueditor
```

> 如果使用finalshell，则可直接拖拽文件上传，否则请使用linux第三方上传工具进行远程上传

- 重启`nginx`

```
nginx -s reload
```

<br/>

> 打开浏览器输入您的域名，按下回车键，开始你的愉快分享之旅吧！

<br/>
<br/>

## 配置gzip

<br/>

> 配置gzip后，静态文件将被压缩成更小的文件，大大提升浏览器访问静态文件的速度。

- 打开`nginx.conf`，并在`http`模块任意行加入如下代码：

```
gzip on;
gzip_types application/javascript text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/json;
```
`window`与`linux`的配置方式完全一致，只需要找到`nginx.conf`配置文件进行如上操作即可。

<br/>
<br/>

## 线上修改请求地址

- 进入项目文件根目录下

- 进入assets/js文件夹并找到baseUrl文件

```js
const 
  // 接口统一请求前缀地址
  baseUrl = 'https://aboot.missiono.cn',
  // 静态资源请求前缀地址
  prefixUrl = ''
```

修改保存即可