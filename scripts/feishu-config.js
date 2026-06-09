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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * 配置文件路径
 */
const CONFIG_PATH = path.join(__dirname, 'config.json');
/**
 * 加载配置文件
 * @returns FeishuConfig 配置对象
 * @throws Error 当配置文件不存在或格式错误时抛出异常
 */
function loadConfig() {
    if (!fs.existsSync(CONFIG_PATH)) {
        throw new Error(`配置文件不存在: ${CONFIG_PATH}\n` +
            `请复制 config.example.json 为 config.json 并填写你的配置`);
    }
    try {
        const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
        const config = JSON.parse(content);
        if (!config.webhookUrl) {
            throw new Error('配置缺少 webhookUrl 字段');
        }
        if (!config.secret) {
            throw new Error('配置缺少 secret 字段');
        }
        return config;
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error(`配置文件格式错误: ${error.message}`);
        }
        throw error;
    }
}
//# sourceMappingURL=feishu-config.js.map