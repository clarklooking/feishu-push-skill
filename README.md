# feishu-push

飞书机器人消息推送工具，支持文本、卡片、富文本三种消息格式。

## 功能特性

- 纯文本消息 - 简单快捷的通知方式
- 消息卡片 - 支持 Markdown 格式、彩色标题、换行显示
- 富文本消息 - 支持链接、@人、多行内容
- 安全签名 - 自动生成 HMAC-SHA256 签名验证

## 快速开始

### 1. 配置机器人

复制 `scripts/config.json.example` 为 `scripts/config.json`，填入你的飞书机器人配置：

```json
{
  "webhookUrl": "https://open.feishu.cn/open-apis/bot/v2/hook/你的webhook-id",
  "secret": "SEC你的密钥"
}
```

**获取方式：**
1. 飞书创建群 → 群设置 → 机器人 → 添加自定义机器人
2. 添加后获得 **webhookUrl**
3. 安全设置 → 签名校验 → 获得 **secret**

### 2. 安装依赖

```bash
cd scripts
npm install
```

### 3. 发送消息

```bash
# 纯文本
node scripts/cli.js --text "任务完成"

# 消息卡片（支持 \n 换行）
node scripts/cli.js --card "构建结果" "状态：成功\n耗时：2m30s" --color green

# 富文本（多行内容）
node scripts/cli.js --post "通知标题" '[[{"tag":"text","text":"第一行"}],[{"tag":"text","text":"第二行"}]]'
```

## 消息类型

| 类型 | 命令 | 适用场景 |
|------|------|----------|
| 纯文本 | `--text` | 简单通知、状态更新 |
| 消息卡片 | `--card` | 格式化报告、带颜色标题 |
| 富文本 | `--post` | 复杂内容、需要链接 |

## 卡片颜色

blue, wathet, turquoise, green, yellow, orange, red, carmine, violet, purple, indigo, grey

## 使用场景

- 任务完成通知
- 构建结果推送
- 异常告警
- 定时任务汇报
- AI 处理结果通知

## 频率限制

飞书机器人限制 100 次/分钟，请合理使用。

## License

MIT
