
/**  
 * 文章逻辑处理
*/
var mongoose = require('mongoose')

var Post = mongoose.model('Post')
import postHelper from '../dbhelper/postHelper'

exports.addPost = async (ctx,next)=>{
    let {
        title,content,cover,category,author,published,tags,subtitle
    } = ctx.request.body

    let post = new Post({
        title: title,
        content: content,
        cover: cover,
        category: category,
        author: author,
        published: published,
        tags:tags,
        comments:[],
        subtitle: subtitle
    })

    try {
        post = await post.save()
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
 * 查询文章全部
 * @param {*} ctx 
 * @param {*} next 
 */
exports.getAllPosts = async(ctx,next) => {

    var { page,pageSize,categoryId,key } = ctx.request.body
    var data = await postHelper.getAllPosts(page,pageSize,categoryId,key)

    if(data){
        ctx.body = {
            errcode: 0,
            errmsg:'success',
            data
        }
    }else{
        ctx.body = {
            errcode: 20000000000,
            errmsg:'查不到对应的数据'
        }
    }
    
}
/**
 * 查询单个文章
 * @param {*} ctx 
 * @param {*} next 
 */
exports.getPostsById = async(ctx,next) => {
    var {id}= ctx.request.body
    var data = await postHelper.getPostsById(id)
    if(data){
        ctx.body ={
            errcode: 0,
            errmsg:'success',
            data
        }
    }else{
        ctx.body ={
            errcode: 2000000000,
            errmsg:'查不到对应的文章',
        }
        return next
    }
   
}

/**
 * 修改文章
 * @param {*} ctx 
 * @param {*} next 
 */
exports.updatePost = async (ctx,next) => {
    let {
       _id,title,content,cover,category,published,tags,subtitle
    } = ctx.request.body

    try {
        var conditions = { _id : _id }
        var updates = { $set: { title : title,content: content, cover: cover,
        category: category, published: published,tags: tags ,subtitle: subtitle} }
        
        await Post.update(conditions,updates,function(err){
            
            if(!err){
                ctx.body = {
                    errcode: 0,
                    errmsg:'success'
                }
            }else{
                ctx.body = {
                    errcode: 20000000001,
                    errmsg:'更新失败，请稍后重试'
                }
            }
        }).exec()
    } catch (error) {
        ctx.body = {
            errcode: 20000000001,
            errmsg:'保存失败，请稍后重试'
        }
        return next
    }
}

/**
 * 删除文章
 * @param {}} ctx 
 * @param {*} next 
 */
exports.delPost = async(ctx,next) => {
    var {id}= ctx.request.body
    var conditions = { _id: id}

    await Post.remove(conditions,(error) => {
        if(!error){
            ctx.body ={
                errcode: 0,
                errmsg:'success',
            }
        }else{
            ctx.body ={
                errcode: 20000000000,
                errmsg:'删除失败:'+ error
            }
            return next
        }
    }).exec()
}

exports.getPostTop10 = async(ctx,next) => {
    let data = await postHelper.getPostTop10(10);
    ctx.body ={
        errcode: 0,
        errmsg:'success',
        data
    }
}