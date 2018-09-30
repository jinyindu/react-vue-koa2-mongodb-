/**
 * 分类
 */
var mongoose =  require('mongoose')
var Tag = mongoose.model('Tag')
import tagHelper from '../dbhelper/tagHelper'

exports.addTag = async (ctx,next) => {
    let { name } = ctx.request.body
    
    var tag = new Tag({
        name: name
    })

    try {
        tag = await tag.save()
        if(tag){
            ctx.body = {
                errcode: 0,
                errmsg:'success'
            }
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
 * 查询所有的分类
 * 
*/
exports.getAllTags = async (ctx,next) => {
    var data = await tagHelper.getAllTags()
    ctx.body = {
        errcode: 0,
        errmsg:'success',
        data
    }
}
