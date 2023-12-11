"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMd5Content = exports.getEncodeHeader = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
/**
 * 鉴权加密
 */
function getEncodeHeader(params = {}, appKey, appSecret) {
    const timestamp = parseInt(Date.now() / 1000 + '');
    const nonce = parseInt(Math.random() * 100000 + '') + timestamp;
    const header = {
        'x-bili-accesskeyid': appKey,
        'x-bili-content-md5': getMd5Content(JSON.stringify(params)),
        'x-bili-signature-method': 'HMAC-SHA256',
        'x-bili-signature-nonce': nonce + '',
        'x-bili-signature-version': '1.0',
        'x-bili-timestamp': timestamp
    };
    const data = [];
    for (const key in header) {
        data.push(`${key}:${header[key]}`);
    }
    const signature = node_crypto_1.default.createHmac('sha256', appSecret).update(data.join('\n')).digest('hex');
    return Object.assign(Object.assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, header), { Authorization: signature });
}
exports.getEncodeHeader = getEncodeHeader;
/**
 * MD5加密
 */
function getMd5Content(str) {
    return node_crypto_1.default.createHash('md5').update(str).digest('hex');
}
exports.getMd5Content = getMd5Content;
