import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
// join()与resolve()的作用都是用来拼接路径的，主要的区别是join方法生成的相对路径，resolve方法生成的是绝对路径
// __dirname返回当前模块文件解析过后所在的文件夹(目录)的绝对路径，下面拼接返回public所在的绝对路径
const publicDir = p.resolve(__dirname, 'public');

// 根据url返回不同的文件
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: requestUrl, headers } = request
  // 使用url.parse处理查询参数
  const { pathname, search } = url.parse(requestUrl);
  switch (pathname) {
    case '/index.html':
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
        if(error) throw error
        response.end(data)
      })
      break;
    case '/style.css':
      response.setHeader('Content-Type', 'text/css; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
        if(error) throw error
        response.end(data)
      })
      break;
    case '/main.js':
      response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
      fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
        if(error) throw error
        response.end(data)
      })
      break;
    default:
      break;
  }
})

server.listen(8888, () => {
  console.log('有请求')
})