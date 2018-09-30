/**
 * 博客文章标签
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TagsSchema = new Schema({
    name: { type:String }
})

var Tag = mongoose.model('Tag',TagsSchema)
module.exports = Tag