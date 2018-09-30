'use strict'

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config-lite')(__dirname)
const serve = require('koa-static')
const cors = require('koa2-cors');
/**  
 * mongoose 链接数据库
 */
mongoose.Promise = require('bluebird')
mongoose.connect(config.mongodb, function (err) {
  if (err) {
    console.log('mongodb连接失败');
  } else {
    console.log('mongodb连接成功');
  }
})

/****
 * 获取数据库表对应的js对象所在的路径
 * 
 */
const models_path = path.join(__dirname, '/app/models')

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function (modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function (file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      } else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

require('babel-register')


const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session-store')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')

const app = new Koa()

const staticPath = './files'

app.keys = [config.session.secret]
app.use(
  session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    }
  })
);
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(logger())
app.use(session(app))
app.use(bodyParser())
app.use(serve(
  path.join(__dirname, staticPath)
))
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require('./config/router')()

app
  .use(router.routes())
  .use(router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app