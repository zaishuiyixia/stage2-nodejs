const db = require("./db.js");
const inquirer = require("inquirer");

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read();
  // 添加任务
  list.push({ title, done: false });
  // 存储任务到文件
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

function maskAsDone(list, index) {
  list[index].done = true;
  db.write(list);
}

function markAsUndone(list, index) {
  list[index].done = false;
  db.write(list);
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "新的标题",
      default: list[index].title,
    })
    .then((answer) => {
      list[index].title = answer.title;
      db.write(list);
    });
}

function remove(list, index) {
  list, splice(index, 1);
  db.write(list);
}

function selectTask(list, index) {
  const actions = {
    maskAsDone,
    markAsUndone,
    updateTitle,
    remove,
  };
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "请选择操作",
      choices: [
        { name: "退出", value: "quit" },
        { name: "已完成", value: "maskAsDone" },
        { name: "未完成", value: "markAsUndone" },
        { name: "改标题", value: "updateTitle" },
        { name: "删除", value: "remove" },
      ],
    })
    .then((answer) => {
      const action = actions[answer.action];
      action && action(list, index);
    });
}

function createTask(list) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "请输入任务标题",
    })
    .then((answer) => {
      list.push({
        title: answer.title,
        done: false,
      });
      db.write(list);
    });
}

function displayTasks(list) {
  let operationList = list.map((task, index) => {
    return {
      name: `${task.done ? "[x]" : "[_]"} ${index + 1} - ${task.title}`,
      value: index,
    };
  });

  inquirer
    .prompt({
      type: "list",
      name: "index",
      message: "请选择你想操作的任务",
      choices: [
        { name: "退出", value: "-1" },
        ...operationList,
        { name: "+ 创建任务", value: "-2" },
      ],
    })
    .then((answer) => {
      const index = parseInt(answer.index);
      // 选中了一个任务
      if (index >= 0) {
        selectTask(list, index);
      } else if (index === -2) {
        // 创建任务
        createTask(list);
      }
    });
}

module.exports.showAll = async () => {
  // 读取之前的任务
  const list = await db.read();
  // 打印之前的任务
  displayTasks(list);
};
