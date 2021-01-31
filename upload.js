'use strict'
require('dotenv').config()
// 引入scp2
var client = require('scp2')
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()
const startTime = new Date()
client.scp('./public/', {    // 本地打包文件的位置
  "host": process.env.SERVER_HOST, // 服务器的IP地址
  "port": process.env.SERVER_PORT,            // 服务器端口， 一般为 22
  "username": process.env.SERVER_USERNAME,       // 用户名
  "password": process.env.SERVER_PASSWORD,     // 密码
  "path": process.env.SERVER_PATH            // 项目部署的服务器目标位置
}, err =>{
  spinner.stop()
  const endTime = new Date()
  if (!err) {
    console.log(chalk.green("项目发布完毕!"))
    console.log(chalk.yellow(`耗时: ${endTime - startTime}毫秒`))
  } else {
    console.log("err", err)
  }
})