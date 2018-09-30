const fs = require('fs')
const qiniu = require('../../middlewares/qiniu.js')
const fsfun = require('../../middlewares/fs.js')

exports.upload = async(ctx,next) => {

    var file = ctx.request.files.file
    if(!file.filename ){
        ctx.body = {
            errcode: 404 ,
            errmsg : '请选择上传文件'
        }
    }
    let filename = file.filename
    /** 上传七牛 */
    let data = await qiniu({
        bucket: ' jinyinblog',
        filePath: file.path,
        qiniuFileName: filename
    });

    /** 写入json */
    // fsfun.updatePackageVersion({
    //     hash        : data.hash,
    //     key         : data.key
    // });


    ctx.body = {
        code: data.error ? 10404 : 200 ,
        msg : data.error ? data.error : '文件上传完成',
        data: {
            imgUrl: `http://pdl1m8qs9.bkt.clouddn.com/${data.key}`
        }
    }
 
}