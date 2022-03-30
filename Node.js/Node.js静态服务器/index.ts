import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http'

const server = http.createServer();

server.on('request', (request: IncomingMessage, reponse: ServerResponse) => {
  console.log('method', request.method)
  console.log('url', request.url)
  console.log('headers', request.headers)
  const array = [];
  // 接收到数据时触发。 参数 data 将是 Buffer 或 String，可用来获取消息体
  request.on('data', (chunk) => {
    // 上传是分段上传
    array.push(chunk)
    console.log('array', array)
  })
  // 传输结束时触发，可用来拼接消息体
  request.on('end', () => {
    const requestBody = Buffer.concat(array).toString()
    console.log('requestBody', requestBody)
    // 修改返回的状态码
    reponse.statusCode = 201
    reponse.end('hi')
  })
})

server.listen(8888, () => {
  console.log('有请求')
})