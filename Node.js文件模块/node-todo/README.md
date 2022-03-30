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