// 设置响应头
module.exports = async (ctx, next) => {
    const conterType = 'application/json; charset=utf-8';
    ctx.set('Content-Type', conterType)
    // 允许跨域
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods',"OPTIONS,GET,PUT,POST,DELETE")
    
    // ctx.response.body = '{"success":true}'
    await next()
}