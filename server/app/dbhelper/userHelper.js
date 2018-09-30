
var mongoose =  require('mongoose')
var User = mongoose.model('User')

/**
 * 根据用户名获取用户信息
 * @param {*} username 
 */
exports.getUserByAccount = async(username) => {
    return User
    .findOne({ username:username })
    .exec();
}