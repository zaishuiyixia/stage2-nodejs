### 查看.todo文件
```
cat ~/.todo
```
### 发布到npm
首先package.json里设置的name不能和已发布的npm包同名，否则不能发布

添加bin提供给用户使用的命令行，命令行的逻辑都在cli.js文件中
```
"bin": {
  "todo": "cli.js"
}
```

main设置提供给用户使用的逻辑文件，如果用户想使用我们的逻辑功能的话，逻辑代码都在index.js文件中

files设置哪些文件是有用的
```
// 简写所有的js文件（cli、db、index）都是有用的
"files": [
  "*.js"
]
``` 

macos或者Linux系统最运行下如下命令让cli.js变成可执行文件
```
chmod +x cli.js
```

在命令行文件cli.js文件第一行添加Shebang：
```
#!/usr/bin/env node
```
[五分钟了解 Node.js Shebang](https://www.infoq.cn/article/ruhagzscuw571sokukvy)
[#!/usr/bin/env node 到底是什么](https://juejin.cn/post/6844903826344902670)

发布前需要把淘宝园切换为原始源，发布命令：
```
yarn login
yarn publish
//或者
npm adduser
npm publish
```
更新代码再发布的时候，别忘了改version版本

常见错误
- 发布的包名跟线上包名重复，不允许发布，需要改名
- 你用户名密码不匹配，重新设置密码
- 没有改版本号，不能发布同一版本，需要升级版本

发布成功后即可上访问https://www.npmjs.com/网址查看你的包