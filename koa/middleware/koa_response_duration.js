// 计算总时长
module.exports = async (ctx, next) => {
    // 记录开始的时间
    const start = Date.now()
    // 让中间件得到执行
    await next()
    // 记录结束的时间
    const end = Date.now()
    // 设置响应头 X-Response-Time
    const duration = end - start
    // ctx.set 设置响应头
    ctx.set('X-Response-Time', duration + 'ms')
}