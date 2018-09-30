
var mongoose =  require('mongoose')
var Tag = mongoose.model('Tag')

/**
 * 根据全部类型
 * @param {*} username 
 */
exports.getAllTags= async () => {
    var query = await Tag.find({});
    return query
}