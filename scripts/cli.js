"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/**
 * 显示帮助信息
 */
function showHelp() {
    console.log(`
飞书机器人消息推送工具

用法:
  npx ts-node src/cli.ts --text <消息内容>
  npx ts-node src/cli.ts --post <标题> <内容JSON>
  npx ts-node src/cli.ts --card <标题> <内容> [--color <颜色>]

选项:
  --text    发送纯文本消息
  --post    发送富文本消息（内容为 JSON 格式的二维数组）
  --card    发送消息卡片
  --color   卡片标题颜色（默认: blue）
  --help    显示帮助信息

示例:
  npx ts-node src/cli.ts --text "任务完成"
  npx ts-node src/cli.ts --post "构建结果" '[[],[]]'
  npx ts-node src/cli.ts --card "构建成功" "耗时 2m30s" --color green

支持的颜色:
  blue, wathet, turquoise, green, yellow, orange,
  red, carmine, violet, purple, indigo, grey
  `);
}
/**
 * 解析命令行参数
 * @returns 解析后的参数对象
 */
function parseArgs() {
    const args = process.argv.slice(2);
    let type = '';
    let color = 'blue';
    const values = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--help' || arg === '-h') {
            showHelp();
            process.exit(0);
        }
        if (arg === '--text') {
            type = 'text';
            continue;
        }
        if (arg === '--post') {
            type = 'post';
            continue;
        }
        if (arg === '--card') {
            type = 'card';
            continue;
        }
        if (arg === '--color') {
            color = args[++i] || 'blue';
            continue;
        }
        values.push(arg);
    }
    return { type, args: values, color };
}
/**
 * 主函数
 */
async function main() {
    const { type, args, color } = parseArgs();
    if (!type) {
        showHelp();
        process.exit(1);
    }
    try {
        const bot = new index_1.FeishuBot();
        switch (type) {
            case 'text':
                if (args.length < 1) {
                    console.error('错误: --text 需要消息内容');
                    process.exit(1);
                }
                await bot.sendText(args[0]);
                console.log('✓ 文本消息发送成功');
                break;
            case 'post':
                if (args.length < 2) {
                    console.error('错误: --post 需要标题和内容 JSON');
                    process.exit(1);
                }
                try {
                    const content = JSON.parse(args[1]);
                    await bot.sendPost(args[0], content);
                    console.log('✓ 富文本消息发送成功');
                }
                catch (e) {
                    console.error('错误: 内容 JSON 格式错误');
                    process.exit(1);
                }
                break;
            case 'card':
                if (args.length < 2) {
                    console.error('错误: --card 需要标题和内容');
                    process.exit(1);
                }
                // 将字面 \n 替换为真正的换行符
                const cardContent = args[1].replace(/\\n/g, '\n');
                await bot.sendCard(args[0], cardContent, color);
                console.log('✓ 卡片消息发送成功');
                break;
            default:
                console.error(`错误: 未知消息类型 ${type}`);
                showHelp();
                process.exit(1);
        }
    }
    catch (error) {
        console.error('发送失败:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=cli.js.map