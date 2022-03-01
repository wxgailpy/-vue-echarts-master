const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
// 创建 WebSocket 服务端的对象 绑定的端口号是9998
const wss = new WebSocket.Server({
    port: 9998
})
module.exports.listen = () => {
    // 对客户端的链接事件进行监听
    // client 代表的是客户端的链接socket对象
    wss.on('connection', client => {
        console.log('有客户端链接成功了');
        // 对客户端的链接对象进行message事件的监听
        // msg 由客户端发个服务端的数据
        client.on('message', async msg => {
            console.log('客户端发送数据给服务端了:' + msg);
            let payload = JSON.parse(msg)
            const action = payload.action
            // console.log(action);
            if (action === 'getData') {
                let filePath = '../data/' + payload.chartName + '.json'
                filePath = path.join(__dirname, filePath)
                const ret = await fileUtils.getFileJsonData(filePath)
                // 增加data字段 值就是json文件的内容
                payload.data = ret
                // console.log(1);
                // console.log((msg.toString()));
                client.send(JSON.stringify(payload))
            } else {
                // 原封不动的把接收到的数据转发给每一个处于链接状态的客户端
                wss.clients.forEach((client) => {
                    // console.log(2);
                console.log(client);

                    console.log((msg.toString()));
                    client.send(msg)
                })
            }
            // 由客户端发个服务端的数据
            // client.send('hello')

        })
    })
}
