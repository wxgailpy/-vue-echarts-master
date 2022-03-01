// 创建koa对象
const Koa = require('koa');
const app = new Koa()

// 编写响应函数
// 第一层中间件
app.use(require('./middleware/koa_response_duration'))

// 第二层中间件
app.use(require('./middleware/koa_response_header'))

// 第三层中间件
app.use(require('./middleware/koa_response_data'))

// 绑定端口函数
app.listen(3000)


const webStockets = require('./service/web_socket')
// 开始服务端的监听
webStockets.listen()