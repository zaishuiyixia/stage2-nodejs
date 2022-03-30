//返回一个字符串，该字符串为当前用户指定主目录的路径(即：~/)
const homedir = require('os').homedir()
// 如何用户设置了主目录的node环境变量则使用用户设置的路径，否则使用当前用户的配置文件目录的路径
const home = process.env.Home || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (readFileError, data) => {
        if(readFileError) return reject(readFileError)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath, title) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(dbPath, string + '\n', (writeFileError) => {
        if(writeFileError) return  reject(writeFileError)
      })
    })
  }
}

module.exports = db
