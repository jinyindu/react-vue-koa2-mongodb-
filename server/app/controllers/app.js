
/**
 * 封装controllers的公共方法
 */

exports.hasBody = async (ctx,next) => {
    var body = ctx.request.body || {}

    if(Object.keys(body).length === 0){
        ctx.body = {
            errcode: 1001,
            errmsg:'缺少参数'
        }
        return next
    }

    await next()
}