/** 
 * 用户信息
 */
var xss = require('xss')
var crypto = require("crypto");
var mongoose =  require('mongoose')
var User = mongoose.model('User')
import userHelper from '../dbhelper/userHelper'

/**
 * 注册新用户
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.signup = async (ctx, next) => {

    let { username,name,nickname,password,email,gender,age }  = ctx.request.body

    password = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

    var user = new User({
        username: username,
        name: name,
        nickname:nickname,
        password: password,
        email:email,
        gender:gender,
        age:age
    })
    try {
        user = await user.save()
        ctx.body = {
            errcode: 0,
            errmsg:'success'
        }
    } catch (error) {
        ctx.body = {
            errcode: 20000000001,
            errmsg:'保存失败，请稍后重试'
        }
        return next
    }
}

/** 
 * Login
*/
exports.signin = async (ctx, next) => {
    let { username,password }  = ctx.request.body
    let user = await userHelper.getUserByAccount(username)

    password = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

    if(user && password === user.password){
        delete user.password;
        ctx.body = {
            errcode: 0,
            errmsg:'success'
        }
    }else{
        ctx.body = {
            errcode: 20000000001,
            errmsg:'用户或密码错误'
        }
        return next
    }
}
