'use strict'
require('dotenv').config()
// 引入node-scp
const { Client } = require('node-scp')
const fs = require('fs')
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()
const startTime = new Date()
Client({
  host: process.env.SERVER_HOST,
  port: process.env.SERVER_PORT,
  username: process.env.SERVER_USERNAME,
  privateKey: fs.readFileSync(process.env.PRIVATEKEY),
  passphrase: process.env.PASSPHRASE,
}).then(client => {
  client.uploadDir('./public', process.env.SERVER_PATH)
    .then(response => {
      client.close()
      spinner.stop()
      const endTime = new Date()
      console.log(chalk.green("项目发布完毕!"))
      console.log(chalk.yellow(`耗时: ${endTime - startTime}毫秒`))
    }).catch(error => {})
  }).catch(e => console.log(e))