---
name: feishu-push
description: >
  飞书机器人消息推送工具。发送文本、卡片、富文本消息到飞书群。
  Use when user says "发送飞书", "通知飞书", "push to feishu", "send feishu message",
  "飞书推送", "飞书通知", or wants to send a notification to Feishu/Lark.
---

## 配置

编辑 `scripts/config.json`，填写你的飞书机器人配置：

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

## 发送方式

```bash
# 纯文本
node scripts/cli.js --text "消息内容"

# 消息卡片（支持 \n 换行）
node scripts/cli.js --card "标题" "第一行\n第二行\n第三行" --color green

# 富文本（二维数组，每个数组元素单独一行）
node scripts/cli.js --post "标题" '[[{"tag":"text","text":"第一行"}],[{"tag":"text","text":"第二行"}]]'
```

## 卡片颜色

blue, wathet, turquoise, green, yellow, orange, red, carmine, violet, purple, indigo, grey

## 使用场景

- 任务完成通知
- 构建结果推送
- 异常告警
- 定时任务汇报
- AI 处理结果通知

## 工作流程

1. 用户表达发送飞书消息的意图
2. 根据内容类型选择 `--text`、`--card` 或 `--post`
3. 执行命令发送消息
4. 返回发送结果

## 注意事项

- 频率限制 100 次/分钟
- 敏感信息在 `scripts/config.json`，不会提交到 git
