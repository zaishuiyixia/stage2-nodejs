import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
// join()与resolve()的作用都是用来拼接路径的，主要的区别是join方法生成的相对路径，resolve方法生成的是绝对路径
// __dirname返回当前模块文件解析过后所在的文件夹(目录)的绝对路径，下面拼接返回public所在的绝对路径
const publicDir = p.resolve(__dirname, 'public');
let cacheAge = 3600 * 24 * 365
// 匹配任意文件
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: requestUrl, headers } = request
  // 使用url.parse处理查询参数
  const { pathname, search } = url.parse(requestUrl);
  // 处理非GET请求
  if(method !== 'GET') {
    response.statusCode = 405
    response.end()
    return
  }
  // 获取文件名
  let filename = pathname.substr(1)
  if(filename === '') {
    filename = 'index.html'
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if(error) {
      console.log(error)
      // 访问的文件不存在，返回写好的404页面
      if(error.errno === -4058) {
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          if(error) throw error
          response.statusCode = 404
          response.end(data)
        })
      } else if(error.errno === -4068) {
        // 访问文件夹的错误处理
        response.statusCode = 403
        response.end('无权访问目录内容')
      } else {
        response.statusCode = 500
        response.end('服务器繁忙，请稍后再试')
      }
    } else {
      // 添加缓存选项，设置Cache-Control缓存时间，第二次在地址栏敲回车进来除了首页index.html文件其他资源文件加载0ms
      response.setHeader('Cache-Control', `public, max-age = ${ cacheAge }`)
      response.end(data)
    }
  })
})

server.listen(8888, () => {
  console.log('有请求')
})