// 业务逻辑中间件 读取每个数据文件
const path = require('path');
const fileutils = require('../utils/file_utils');
module.exports = async (ctx, next) => {
    // 根据url
    const url = ctx.request.url
    let filePath = url.replace('/api', '')
    filePath = '../data' + filePath + '.json'
    filePath = path.join(__dirname, filePath)
    try {
        const ret = await fileutils.getFileJsonData(filePath)
        ctx.response.body = ret
    } catch (error) {
        const errorMsg = {
            message: '读取文件失败,文件不存在',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }

    console.log(filePath);
    await next()
}

