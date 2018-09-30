/**
 *
 * @Exm Model
 * 文件操作模块（自行添加）
 * @Dmr
 * @DateTime  Mon Jul 02 2018 16:48:06 GMT+0800 (中国标准时间)
 * @Param
 *
 *
 */

const fs = require('fs')
const path = require('path')

const basePath = path.resolve(__dirname, '..')

module.exports = {

    /**
     *
     * 创建包版本管理文件
     * 主要用于记录每个版本包和下载key的对应关系
     * @Dmr
     * @DateTime  Mon Jul 03 2018 16:33:02 GMT+0800 (中国标准时间)
     * @Param
     *
     *      _JSON{
     *
     *              packageName:dd
     *      }
     * @Return true or false
     *
     */

    updatePackageVersion(_JSON) {

        var filePath = basePath + '/version/packageVersion.json'

        fs.access(filePath, fs.constants.F_OK, (err) => {

            /** 如果文件不存在 则创建 */
            if(err){

                let bin = this.updateVersionJson({history:[]}, _JSON);

                let fd = fs.openSync( filePath, 'w+')
                fs.writeSync(fd, bin)
                fs.closeSync(fd)

                return true;

            }else{

                let bin = this.ReadFileSync();

                if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
                    bin = bin.slice(3);
                }

                bin = JSON.parse(this.BufferToJson(bin));

                if ( bin[_JSON.packageTend] ){

                    return false;

                }

                bin = this.updateVersionJson(bin, _JSON)

                let fd = fs.openSync( filePath, 'w+')
                fs.writeSync(fd, bin)
                fs.closeSync(fd)

                return true;

            }

        });


    },

    /**
     *
     * update or create version Json
     * 创建或者更新版本json
     * @Dmr
     * @DateTime  Mon Jul 03 2018 16:33:02 GMT+0800 (中国标准时间)
     * @Param json  and   _JSON
     * json.history is Array
     * @Return json (String)
     *
     */

    updateVersionJson(json, _JSON) {

        let obj = {};
        let lastVersion = json.history[json.history.length - 1];

        obj.version = _JSON.packageVice
        obj.channe = [{

            /** 七牛下载文件key */
            key         : _JSON.key,

            /** 七牛下载文件hash */
            hash        : _JSON.hash,

            /** 当前包名 */
            packageTend : _JSON.packageTend,

            /** 当前渠道号 */
            channelNum : _JSON.channelNum,

            /** 当前渠道名称 */
            channelName : _JSON.channelName,

            /** 当前包版本 */
            packageVice : _JSON.packageVice,

            /** 当前版本备注 */
            packageMark : _JSON.packageMark,

            /** 当前包上传时间戳 */
            creatTime: new Date().getTime()

        }];

        if( lastVersion.version == _JSON.packageVice ){

            json.history[json.history.length - 1].channe.push(obj.channe[0]);

        }else{

            json.history.push(obj);

        }

        return JSON.stringify(json);

    },

    /**
     *
     *
     * Read version file
     * 读取文件版本文件
     * @Dmr
     * @DateTime  Mon Jul 04 2018 10:33:02 GMT+0800 (中国标准时间)
     * @Param path
     *
     * @Return json (string)
     *
     */

    ReadFileSync() {

        return fs.readFileSync(basePath + '/version/packageVersion.json');

    },

    /**
     *
     * Buffer To Json
     * Buffer 对象转换为可以操作的JSON对象
     * @Dmr
     * @DateTime  Mon Jul 03 2018 16:33:02 GMT+0800 (中国标准时间)
     * @Param json
     *
     * @Return json
     *
     */

    BufferToJson (json) {

        return new Buffer(JSON.parse(JSON.stringify(json))).toString();

    },

    /**
     *
     * Select last version info
     * 查看最后一次版本的相关信息
     * @Dmr
     * @DateTime  Mon Jul 05 2018 16:33:02 GMT+0800 (中国标准时间)
     * @Param
     *
     * @Return json (Object)
     *
     */

    SelectLastVersion () {

        let bin = this.ReadFileSync();
        bin = JSON.parse(this.BufferToJson(bin)).history;

        return bin[bin.length - 1];

    },

}