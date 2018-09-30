/**
 * 博客文章分类
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new Schema({
    name: { type:String }
})


var Category = mongoose.model('Category',CategorySchema)
module.exports = Category