"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.FeishuBot = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const configModule = __importStar(require("./feishu-config"));
exports.Config = configModule;
/**
 * 飞书机器人消息推送类
 */
class FeishuBot {
    /**
     * 创建飞书机器人实例
     * @param config 配置对象，若不传则从 config.json 加载
     */
    constructor(config) {
        const cfg = config || configModule.loadConfig();
        this.webhookUrl = cfg.webhookUrl;
        this.secret = cfg.secret;
    }
    /**
     * 生成签名校验
     * @param timestamp 时间戳（秒）
     * @param secret 密钥
     * @returns Base64 编码的签名字符串
     */
    genSign(timestamp) {
        const stringToSign = `${timestamp}\n${this.secret}`;
        return crypto.createHmac('sha256', stringToSign).digest('base64');
    }
    /**
     * 发送请求到飞书
     * @param body 请求体
     */
    async send(body) {
        const timestamp = Math.floor(Date.now() / 1000);
        const sign = this.genSign(timestamp);
        const payload = {
            timestamp: timestamp.toString(),
            sign,
            ...body,
        };
        try {
            const response = await axios_1.default.post(this.webhookUrl, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.code !== 0) {
                throw new Error(`飞书 API 错误: ${response.data.msg}`);
            }
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`HTTP 请求失败: ${error.message}`);
            }
            throw error;
        }
    }
    /**
     * 发送纯文本消息
     * @param text 消息内容
     * @returns Promise<void>
     */
    async sendText(text) {
        await this.send({
            msg_type: 'text',
            content: { text },
        });
    }
    /**
     * 发送富文本消息（支持链接、@人）
     * @param title 富文本标题
     * @param content 富文本内容，二维数组结构
     * @returns Promise<void>
     */
    async sendPost(title, content) {
        await this.send({
            msg_type: 'post',
            content: {
                post: {
                    zh_cn: {
                        title,
                        content,
                    },
                },
            },
        });
    }
    /**
     * 发送消息卡片
     * @param title 卡片标题
     * @param content 卡片内容
     * @param color 标题颜色（blue/wathet/turquoise/green/yellow/orange/red/carmine/violet/purple/indigo/grey），默认 blue
     * @returns Promise<void>
     */
    async sendCard(title, content, color = 'blue') {
        await this.send({
            msg_type: 'interactive',
            card: {
                header: {
                    title: { tag: 'plain_text', content: title },
                    template: color,
                },
                elements: [
                    { tag: 'markdown', content },
                ],
            },
        });
    }
}
exports.FeishuBot = FeishuBot;
//# sourceMappingURL=index.js.map