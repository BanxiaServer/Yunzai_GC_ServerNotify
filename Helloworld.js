
import fetch from "node-fetch";

// 引入Yunzai插件功能
import plugin from '../../lib/plugins/plugin.js';

// 导出类，类名与文件名一致，继承插件类
export class Helloworld extends plugin {
    constructor() {
        super({
            // 后端信息
            name: 'Helloworld', // 插件名字，可以随便写
            dsc: 'Helloworld', // 插件介绍，可以随便写
            event: 'message', // 这个直接复制即可，别乱改
            priority: 1, // 执行优先级：数值越低越靠前
            rule: [
                {
                    // 正则表达式
                    reg: '.*服务器.*',
                    // 函数
                    fnc: 'server'
                }
            ]
        })
    }


    async server() {
        const response = await fetch('http://bxgov.cn:21452/status/server');
        //const response = await fetch('http://127.0.0.1:21452/status/server');
        const data = await response.json();
        const { version,  playerCount } = data.status;

        let msg_playerCount;
        if (playerCount > 0) {
            msg_playerCount = `在线玩家：${playerCount}\n`;
        } else if(playerCount === 0){
            msg_playerCount = `暂无在线玩家 服务器大概是崩了 请轰炸群主\n`;
        } else {
            msg_playerCount = `没有检测到服务器\n`;
        }

        let msg_version;
        if (version) {
            msg_version = `当前版本：${version}\n`;
        } else {
            msg_version = `没有检测到版本\n`;
        }

        let currentDate = new Date();
        let time = `当前时间：${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}\n`;
        let msg_last = "网页查询：bxgov.cn:21452";

        await this.reply(time + msg_playerCount + msg_version + msg_last);
      }
}