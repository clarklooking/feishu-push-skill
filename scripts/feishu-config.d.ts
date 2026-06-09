/**
 * 飞书机器人配置接口
 */
export interface FeishuConfig {
    /** 飞书机器人 Webhook URL */
    webhookUrl: string;
    /** 签名校验密钥（在机器人安全设置中获取） */
    secret: string;
}
/**
 * 加载配置文件
 * @returns FeishuConfig 配置对象
 * @throws Error 当配置文件不存在或格式错误时抛出异常
 */
declare function loadConfig(): FeishuConfig;
export { loadConfig };
//# sourceMappingURL=feishu-config.d.ts.map