/**
 * 路由配置
 */
const Router = require('koa-router')
const multer = require('koa-multer')
const App = require('../app/controllers/app')
const User = require('../app/controllers/user')
const Category = require('../app/controllers/category')
const Tag = require('../app/controllers/tag')
const Post = require('../app/controllers/post')
const Upload = require('../app/controllers/upload')

const storage = multer.diskStorage({
  destination:'static/uploads/'+new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' +  new Date().getDate(),
  filename(ctx,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,'okayplus' + Date.now() + '.' + filenameArr[filenameArr.length-1]);
  }
});

//初始化上传配置
const upload = multer({storage});

module.exports = function(){
  var router = new Router()
  //用户注册
  router.post('/u/signup', App.hasBody, User.signup)
  //用户登录
  router.post('/u/signin', App.hasBody, User.signin)

  //添加分类
  router.post('/u/addCategory',App.hasBody,Category.addCategory)

  //所有分类
  router.post('/u/getAllCategory',Category.getAllCategory)

  //添加标签
  router.post('/u/addTag',App.hasBody,Tag.addTag)

  //全部标签
  router.post('/u/getAllTag',Tag.getAllTags)
  //添加文章
  router.post('/u/addPost',App.hasBody,Post.addPost)

  //查询文章
  router.post('/u/getAllPosts',App.hasBody,Post.getAllPosts)

  //查询单个文章
  router.post('/u/getPostById',App.hasBody,Post.getPostsById)
  //更新博客信息
  router.post('/u/updatePost',App.hasBody,Post.updatePost)
  //删除博客
  router.post('/u/delPost',App.hasBody,Post.delPost)
  //上传图片
  router.post('/u/upload',Upload.upload)

  router.post('/u/getCategoryCount',Category.getCategoryCount)

  //最新文章
  router.post('/u/getPostTop10',Post.getPostTop10)
  return router
}
