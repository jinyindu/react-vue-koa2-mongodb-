/**
 * 七牛云上传服务
 */
var qiniu = require("qiniu");
const config1 = require('../config/config');


module.exports = function (options) {
    if (!options.bucket && !options.qiniuFileName && !options.filePath) {
        console.log('请补全参数!');
        return false;
    }
    //默认参数
    options = Object.assign({
        bucket: '',
        filePath: '',
        qiniuFileName: ''
    }, options);

    const accessKey = "g6XL73YOaTDBkTp0fytUfYfrzSDBIdmoa18zaEe2"
    const secretKey = "tVSXuZYx5wLZ9L-jcu-vasVrJsidQqQs-dfDF1XV"

    //生成一个上传的凭证
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    
    //设置七牛的上传空间
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: "jinyinblog"
    })

    //生成上传的Token
    const uploadToken = putPolicy.uploadToken(mac)

    //实例化config
    const config = new qiniu.conf.Config()

    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z0

    const localFile = options.filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    // 文件上传
    return new Promise((resolve, reject) => {
        
        formUploader.putFile(uploadToken, options.qiniuFileName, localFile, putExtra, function (respErr, respBody, respInfo) {

            if (respErr) {
                reject(respErr)
            }
            if (respInfo.statusCode == 200) {
                resolve(respBody)
            } else {
                resolve(respBody)
            }
        })
    })
}