#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')

program
  .option( '-x, --xxx', 'what the x')
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const taskTitle = args.slice(0, -1).join(' ')
    api.add(taskTitle)
  });
program
  .command('clear')
  .description('clear tasklist')
  .action(() => {
    api.clear()
  });

let argv = process.argv
program.parse(argv)

// console.log('argv', argv)

if(argv.length === 2) {
  // 说明用户直接运行 node cli.js 没有添加其他参数
  api.showAll()
}