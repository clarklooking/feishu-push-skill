import * as configModule from './feishu-config';
/**
 * 飞书机器人消息推送类
 */
export declare class FeishuBot {
    private webhookUrl;
    private secret;
    /**
     * 创建飞书机器人实例
     * @param config 配置对象，若不传则从 config.json 加载
     */
    constructor(config?: configModule.FeishuConfig);
    /**
     * 生成签名校验
     * @param timestamp 时间戳（秒）
     * @param secret 密钥
     * @returns Base64 编码的签名字符串
     */
    private genSign;
    /**
     * 发送请求到飞书
     * @param body 请求体
     */
    private send;
    /**
     * 发送纯文本消息
     * @param text 消息内容
     * @returns Promise<void>
     */
    sendText(text: string): Promise<void>;
    /**
     * 发送富文本消息（支持链接、@人）
     * @param title 富文本标题
     * @param content 富文本内容，二维数组结构
     * @returns Promise<void>
     */
    sendPost(title: string, content: any[][]): Promise<void>;
    /**
     * 发送消息卡片
     * @param title 卡片标题
     * @param content 卡片内容
     * @param color 标题颜色（blue/wathet/turquoise/green/yellow/orange/red/carmine/violet/purple/indigo/grey），默认 blue
     * @returns Promise<void>
     */
    sendCard(title: string, content: string, color?: string): Promise<void>;
}
export { configModule as Config };
//# sourceMappingURL=index.d.ts.map