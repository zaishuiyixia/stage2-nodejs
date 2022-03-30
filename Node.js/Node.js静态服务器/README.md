### 创建项目
- yarn init -y初始化项目生成package.json文件
- yarn add -D @types/node 安装node声明文件，这样写ts文件时就会有更好的只能提示
- curl工具，发送请求
```
curl http://localhost:8888
// -v 输出请求信息
curl -v http://localhost:8888
// -d 发送post请求，后面跟要传递的参数
curl -v -d "name=zaishuiyixai" http://localhost:8888
```
- node-dev工具：当文件更新时自动重启node
- ts-ndoe工具，让node支持直接运行TypeScript代码
- ts-node-dev工具，这个工具结合了node-dev和ts-node可以使用TypeScript开发Node.js程序，且会自动重启