/**
 * 分类
 */
var mongoose =  require('mongoose')
var Category = mongoose.model('Category')
import categoryHelper from '../dbhelper/categoryHelper'

exports.addCategory = async (ctx,next) => {
    let { name } = ctx.request.body

    var category = new Category({
        name: name
    })

    try {
        category = await category.save()
        if(category){
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
exports.getAllCategory = async (ctx,next) => {
    var data = await categoryHelper.getAllCategorys()
    ctx.body = {
        errcode: 0,
        errmsg:'success',
        data
    }
}

exports.getCategoryCount = async (ctx,next) => {
    var data = await categoryHelper.getCategoryCount()
    ctx.body = {
        errcode: 0,
        errmsg:'success',
        data
    }

}
